
$categories = @(
  @{ Key="saman"; Query="Penari Saman Aceh" },
  @{ Key="keris"; Query="Keris Surakarta" },
  @{ Topic="Batik Tulis"; Query="Batik Canting Tulis Solo" },
  @{ Topic="Wayang Kulit"; Query="Wayang Kulit dalang" },
  @{ Topic="Rumah Tongkonan"; Query="Tongkonan Toraja Sulawesi" },
  @{ Topic="Rumah Gadang"; Query="Rumah Gadang Minangkabau Padang" },
  @{ Topic="Candi Borobudur"; Query="Borobudur Temple Stupa Magelang" },
  @{ Topic="Angklung"; Query="Angklung bambu Jawa Barat" },
  @{ Topic="Tari Bali"; Query="Tari Legong Bali Legong dance" },
  @{ Topic="Gamelan"; Query="Gamelan Jawa gamelan ensemble" },
  @{ Topic="Kain Songket"; Query="Songket Palembang Minangkabau" },
  @{ Topic="Tenun Ikat"; Query="Tenun Ikat Sumba NTT" },
  @{ Topic="Rendang"; Query="Rendang Padang Minang beef" },
  @{ Topic="Kesenian Topeng"; Query="Topeng Cirebon Panji" },
  @{ Topic="Prajurit Keraton"; Query="Bregada Keraton Yogyakarta" }
)

$headers = @{ 'User-Agent' = 'RuangBudaya/1.0 (tester@ruangbudaya.id)' }
$verified = @()

foreach ($cat in $categories) {
    $q = $cat.Query
    $url = "https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=" + [System.Uri]::EscapeDataString($q) + "&gsrlimit=3&gsrnamespace=6&prop=imageinfo&iiprop=url|thumburl&iiurlwidth=800&format=json"
    try {
        $resp = Invoke-RestMethod -Uri $url -Headers $headers -TimeoutSec 10
        if ($resp.query -and $resp.query.pages) {
            foreach ($prop in $resp.query.pages.PSObject.Properties) {
                $p = $prop.Value
                if ($p.imageinfo -and $p.imageinfo.Count -gt 0) {
                    $u = $p.imageinfo[0].thumburl
                    if (-not $u) { $u = $p.imageinfo[0].url }
                    # Pastikan ekstensi gambar browser-friendly (jpg, png, webp)
                    if ($u -match '\.(jpg|jpeg|png|webp)') {
                        try {
                            $check = Invoke-WebRequest -Uri $u -Method Head -Headers $headers -TimeoutSec 5 -UseBasicParsing
                            if ($check.StatusCode -eq 200) {
                                $verified += [PSCustomObject]@{
                                    Topik = $cat.Topic
                                    JudulFile = $p.title
                                    UrlGambar = $u
                                }
                                break
                            }
                        } catch {}
                    }
                }
            }
        }
    } catch {}
}

$verified | ConvertTo-Json
