
$keyword = "tari legong bali penari"
$url = "https://www.pinterest.com/search/pins/?q=" + [System.Uri]::EscapeDataString($keyword)
$html = curl.exe -s -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" -L $url
$matches = [regex]::Matches($html, "https://i\.pinimg\.com/736x/[a-f0-9/]+\.jpg")
$list = $matches | ForEach-Object { $_.Value } | Select-Object -Unique -First 10
$list
