
$raw = curl.exe -s -L "https://www.pinterest.com/pin/172051648261759701/"
$matches = [regex]::Matches($raw, "https://i\.pinimg\.com/736x/[a-f0-9/]+\.jpg")
$unique = $matches | ForEach-Object { $_.Value } | Select-Object -Unique
$unique
