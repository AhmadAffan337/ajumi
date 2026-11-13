$comps = @("Testimonials","Team","Services","Pricing","Methodology","Marquee","Hero","CTAButton","CTABanner","Contact","Clients","About","AnimatedBlob","GlowEffect","ParticleField")
foreach ($c in $comps) {
  $f = "components\$c.tsx"
  if (Test-Path $f) {
    $t = Get-Content $f -Raw
    if ($t -notmatch '"use client"') {
      $new = '"use client";' + "`r`n`r`n" + $t
      Set-Content $f $new -Encoding UTF8
      Write-Host "Fixed: $c"
    } else {
      Write-Host "OK: $c"
    }
  } else {
    Write-Host "Not found: $c"
  }
}
