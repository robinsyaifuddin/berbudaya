
$images = @(
  @{ File="tari-saman.jpg"; Url="https://upload.wikimedia.org/wikipedia/commons/7/73/Penari_Saman_Aceh.jpg" },
  @{ File="keris-jawa.jpg"; Url="https://upload.wikimedia.org/wikipedia/commons/7/75/Koleksi_keris_di_padepokan_keris_brojobuwono.jpg" },
  @{ File="batik-tulis.jpg"; Url="https://upload.wikimedia.org/wikipedia/commons/6/6d/Kampung_batik_Masaran.jpg" },
  @{ File="wayang-kulit.jpg"; Url="https://upload.wikimedia.org/wikipedia/commons/6/64/Bangkitlah_wayang_kulit_indonesia.jpg" },
  @{ File="rumah-tongkonan.jpg"; Url="https://upload.wikimedia.org/wikipedia/commons/9/90/Tongkonan%2C_Toraja_houses.jpg" },
  @{ File="rumah-gadang.jpg"; Url="https://upload.wikimedia.org/wikipedia/commons/f/fd/Rumah_Gadang.jpg" },
  @{ File="candi-borobudur.jpg"; Url="https://upload.wikimedia.org/wikipedia/commons/a/ae/Borobudur-Temple-Park_Indonesia_Stupas-of-Borobudur-04.jpg" },
  @{ File="angklung.jpg"; Url="https://upload.wikimedia.org/wikipedia/commons/2/2b/Angklung_Alat_Musik_Tradisional_Warisan_Budaya_Indonesia.jpg" },
  @{ File="tari-legong-bali.jpg"; Url="https://upload.wikimedia.org/wikipedia/commons/8/86/Legong_Dance%2C_Ubud%2C_Bali_02.JPG" },
  @{ File="gamelan-jawa.jpg"; Url="https://upload.wikimedia.org/wikipedia/commons/7/7d/Wayang_Performance_in_Yogyakarta%2C_Java_1050.jpg" }
)

$targetDir = "public\images\budaya"
$headers = @{ 'User-Agent' = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }

foreach ($item in $images) {
    $outPath = Join-Path $targetDir $item.File
    try {
        Write-Output "Downloading $($item.File)..."
        Invoke-WebRequest -Uri $item.Url -OutFile $outPath -Headers $headers -TimeoutSec 15 -UseBasicParsing
        $fi = Get-Item $outPath
        Write-Output "SUCCESS: $($item.File) ($($fi.Length) bytes)"
    } catch {
        Write-Output "FAIL: $($item.File) - $($_.Exception.Message)"
    }
}
