$files = @('js/main.js', 'js/v2-renderer.js')
foreach ($file in $files) {
  $text = Get-Content -Raw $file
  $text = $text.Replace("→", "->")
  $text = $text.Replace("—", "-")
  $text = $text.Replace("–", "-")
  $text = $text.Replace("▾", "v")
  $text = $text.Replace("−", "-")
  $text = $text.Replace("▶", ">")
  $text = $text.Replace("⏸", "||")
  $text = $text.Replace("↺", "reset")
  $text = $text.Replace("✓", "OK")
  $text = $text.Replace("•", "-")
  $text = $text.Replace("·", "-")
  $text = $text.Replace("📋", "[ ]")
  $text = $text.Replace("’", "'")
  Set-Content -Path $file -Value $text
}
