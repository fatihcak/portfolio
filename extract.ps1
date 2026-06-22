Add-Type -AssemblyName System.IO.Compression.FileSystem
$f = Get-Item 'C:\Users\yusuf\OneDrive\Masaüstü\Yazilim\Portfolyo\portfolio-site\final_report.docx'
$zip = [System.IO.Compression.ZipFile]::OpenRead($f.FullName)
$entry = $zip.Entries | Where-Object { $_.FullName -eq 'word/document.xml' }
$stream = $entry.Open()
$reader = New-Object System.IO.StreamReader($stream)
$xml = $reader.ReadToEnd()
$reader.Close()
$zip.Dispose()
$clean = $xml -replace '<[^>]+>',' '
$clean = $clean -replace '\s+',' '
$outPath = Join-Path $f.Directory.FullName 'report_text.txt'
[System.IO.File]::WriteAllText($outPath, $clean.Trim(), [System.Text.Encoding]::UTF8)
Write-Host "OK: $outPath"
