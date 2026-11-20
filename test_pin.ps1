
$pinUrl = "https://www.pinterest.com/pin/1145532855471174359/"
$html = curl.exe -s -L $pinUrl
if ($html -match 'property="og:image" content="([^"]+)"') {
    $imgUrl = $matches[1]
    Write-Output "OG:IMAGE FOUND -> $imgUrl"
    curl.exe -s $imgUrl -o public\images\budaya\tari-kecak-bali.jpg
    if (Test-Path public\images\budaya\tari-kecak-bali.jpg) {
        $len = (Get-Item public\images\budaya\tari-kecak-bali.jpg).Length
        Write-Output "SUCCESS DOWNLOADED LOCALLY: $len bytes"
    }
} else {
    Write-Output "OG:IMAGE NOT FOUND"
}
