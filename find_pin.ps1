
$raw = curl.exe -s -L "https://www.pinterest.com/pin/172051648261759701/"
$m = [regex]::Matches($raw, "https://i\.pinimg\.com/736x/[a-f0-9/]+\.jpg")
foreach ($match in $m) {
    Write-Output "FOUND: $($match.Value)"
    break
}
