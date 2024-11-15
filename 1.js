/* 
Seorang investor menginvestasikan modalnya sebesar 1 miliar ke beberapa instrumen keuangan.
350 juta ditempatkan ke deposito bank dengan keuntungan 3,5% per tahun,
sedangkan 650 juta ditempatkan di obligasi negara sebesar 30% dengan keuntungan 13% per tahun,
35% ditempatkan di saham A dengan keuntungan 14,5% per tahun, dan sisanya ditempatkan di saham B
dengan keuntungan 12,5% per tahun.
Buatlah sebuah fungsi yang menghitung dan mencetak total uang investor setelah dua tahun. 
*/

function totalInvestasi() {
  const modal = 1000000000;

  const depositoBank = { investasi: 350000000, keuntungan: 3.5 };
  const obligasiNegara = { investasi: 650000000 * 0.3, keuntungan: 13 };
  const sahamA = { investasi: 650000000 * 0.35, keuntungan: 14.5 };
  const sahamB = { investasi: 650000000 * 0.35, keuntungan: 12.5 };

  const hasilDeposito = depositoBank.investasi * Math.pow(1 + depositoBank.keuntungan / 100, 2);
  const hasilObligasi = obligasiNegara.investasi * Math.pow(1 + obligasiNegara.keuntungan / 100, 2);
  const hasilSahamA = sahamA.investasi * Math.pow(1 + sahamA.keuntungan / 100, 2);
  const hasilSahamB = sahamB.investasi * Math.pow(1 + sahamB.keuntungan / 100, 2);

  const totalInvestasi = hasilDeposito + hasilObligasi + hasilSahamA + hasilSahamB;

  console.log("Total uang investor setelah dua tahun: Rp " + totalInvestasi.toLocaleString("id-ID"));
  console.log("Dengan keuntungan: Rp " + (totalInvestasi - modal).toLocaleString("id-ID"));
}

totalInvestasi();