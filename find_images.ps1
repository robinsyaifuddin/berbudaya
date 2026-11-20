
$queries = @(
  @{ Topic="Tari Saman"; Query="Tari Saman Aceh" },
  @{ Topic="Keris Jawa"; Query="Keris Jawa Surakarta" },
  @{ Topic="Batik Tulis"; Query="Batik Canting Tulis" },
  @{ Topic="Wayang Kulit"; Query="Wayang Kulit Java" },
  @{ Topic="Rumah Tongkonan"; Query="Tongkonan Toraja" },
  @{ Topic="Rumah Gadang"; Query="Rumah Gadang Minangkabau" },
  @{ Topic="Candi Borobudur"; Query="Borobudur temple stupa" },
  @{ Topic="Alat Musik Angklung"; Query="Angklung Jawa Barat" },
  @{ Topic="Gamelan Jawa"; Query="Gamelan Java performance" },
  @{ Topic="Kain Tenun Ikat"; Query="Ikat textile Sumba" }
)

$results = @()
$headers = @{ 'User-Agent' = 'RuangBudayaBot/1.0 (contact@ruangbudaya.id)' }

foreach ($item in $queries) {
    $searchUrl = "https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=" + [System.Uri]::EscapeDataString($item.Query) + "&gsrlimit=2&gsrnamespace=6&prop=imageinfo&iiprop=url|size&format=json"
    try {
        $resp = Invoke-RestMethod -Uri $searchUrl -Headers $headers -TimeoutSec 10
        if ($resp.query -and $resp.query.pages) {
            foreach ($prop in $resp.query.pages.PSObject.Properties) {
                $p = $prop.Value
                if ($p.imageinfo -and $p.imageinfo.Count -gt 0) {
                    $imgUrl = $p.imageinfo[0].url
                    # Test HTTP HEAD to verify 200 OK
                    try {
                        $testReq = Invoke-WebRequest -Uri $imgUrl -Method Head -Headers $headers -TimeoutSec 5 -UseBasicParsing
                        if ($testReq.StatusCode -eq 200) {
                            $results += [PSCustomObject]@{
                                Topic = $item.Topic
                                Title = $p.title
                                Url = $imgUrl
                                Status = "OK (200)"
                            }
                            break
                        }
                    } catch {
                        # skip if 404
                    }
                }
            }
        }
    } catch {
        # ignore error
    }
}

$results | ConvertTo-Json
