# ==========================================
# AŞAMA 1: BAĞIMLILIKLAR (DEPS)
# ==========================================
# Uygulamamızı derlemek için önce npm paketlerini kurmamız gerek.
# Node.js'in "alpine" sürümü, boyutu çok küçük (sadece ~5MB) bir Linux dağıtımıdır.
# Alpine kullanarak imaj boyutunu inanılmaz derecede küçültmüş oluyoruz.
FROM node:20-alpine AS deps
# Çalışma dizinimizi (klasörümüzü) oluşturuyoruz
WORKDIR /app

# package.json ve package-lock.json dosyalarımızı içeri kopyalıyoruz
COPY package.json package-lock.json ./
# Tüm npm paketlerini kuruyoruz
RUN npm install

# ==========================================
# AŞAMA 2: DERLEME (BUILDER)
# ==========================================
# Sadece derleme işlemini yapacak yeni bir aşama başlatıyoruz.
FROM node:20-alpine AS builder
WORKDIR /app

# Bir önceki "deps" aşamasında kurduğumuz node_modules klasörünü buraya kopyalıyoruz
COPY --from=deps /app/node_modules ./node_modules
# Tüm proje dosyalarımızı (kodu) kopyalıyoruz (.dockerignore hariç olanları)
COPY . .

# Next.js uygulamamızı "production" için derliyoruz. 
# Bu adım kodları minify eder ve optimize eder.
RUN npm run build

# ==========================================
# AŞAMA 3: ÇALIŞTIRMA (RUNNER)
# ==========================================
# Bu bizim son imajımız olacak. İçerisinde kaynak kodlar veya gereksiz paketler olmayacak!
FROM node:20-alpine AS runner
WORKDIR /app

# Ortamı production olarak ayarlıyoruz (performans için kritik)
ENV NODE_ENV=production

# Next.js "standalone" build kullandığı için sadece çalışması gereken dosyaları alıyoruz.
# public klasörünü (resimler vb.) doğrudan kopyalıyoruz.
COPY --from=builder /app/public ./public

# Sadece çalışması gereken en küçük boyutlu kodu (.next/standalone) ve statik dosyaları kopyalıyoruz
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Uygulamanın 3000 portunda çalışacağını belirtiyoruz
EXPOSE 3000

# Docker konteynerı başlatıldığında çalıştırılacak komut (Next.js server'ını başlat)
CMD ["node", "server.js"]
