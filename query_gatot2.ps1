
$url = "https://commons.wikimedia.org/w/api.php?action=query&titles=File:Gatotkaca_(wayang).JPG|File:Gathutkaca_wayang.jpg&prop=imageinfo&iiprop=url&format=json"
$r = Invoke-RestMethod -Uri $url -Headers @{'User-Agent'='Mozilla/5.0'}
foreach ($prop in $r.query.pages.PSObject.Properties) {
    $p = $prop.Value
    if ($p.imageinfo) {
        Write-Output "$($p.title) --> $($p.imageinfo[0].url)"
    }
}
