const form = document.getElementById("generatorForm");
const inputNama = document.getElementById("nama");

const hasilGenerator = document.getElementById("hasilGenerator");
const hasilLink = document.getElementById("hasil");
const templatePesan = document.getElementById("templatePesan");

const btnCopyLink = document.getElementById("btnCopyLink");
const btnCopyPesan = document.getElementById("btnCopyPesan");
const btnWhatsapp = document.getElementById("btnWhatsapp");

const status = document.getElementById("status");

// URL utama undangan
const URL_UNDANGAN = "https://deva-zaidan.vercel.app/";

// Menyimpan hasil generator
let linkUndangan = "";
let pesanUndangan = "";

// Membuat nama menjadi lebih rapi
function formatNama(nama) {
    return nama
        .trim()
        .replace(/\s+/g, " ")
        .toLowerCase()
        .replace(/\b\p{L}/gu, huruf => huruf.toUpperCase());
}

// Membuat pesan undangan
function buatPesan(nama, link) {
    return `_Assalamu'alaikum Warahmatullahi Wabarakatuh_.

Dengan memohon Rahmat dan Ridho Allah SWT, 
_Bismillahirrahmanirrahim_
Dengan penuh rasa syukur, kami mengundang keluarga, kerabat, sahabat dan teman dekat untuk ikut merayakan hari bersejarah dalam hidup kami.”

*Zaidan Zaghlul Faqih, S.Ap*  
Dengan
*Deva Siti Rohmah S.Pd*

Kepada Yth.
${nama}

${link}

Merupakan suatu kehormatan besar bagi kami
apabila berkenan hadir. Semoga langkah kecil 
ini menjadi awal yang baik bagi kehidupan rumah tangga kami. 
Terima kasih atas doa dan restu nya untuk kami berdua.

_Wassalamu'alaikum Warahmatullahi Wabarakatuh._ 
Hormat kami,
Deva & Zaidan`;
}

// Generate link undangan
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const nama = formatNama(inputNama.value);

    if (!nama) {
        alert("Silakan masukkan nama tamu terlebih dahulu.");
        return;
    }

    // Membuat link dengan parameter to
    linkUndangan = URL_UNDANGAN + "?to=" + encodeURIComponent(nama);

    // Membuat pesan otomatis
    pesanUndangan = buatPesan(nama, linkUndangan);

    // Menampilkan hasil
    hasilLink.textContent = linkUndangan;
    templatePesan.textContent = pesanUndangan;

    hasilGenerator.hidden = false;
    status.textContent = "";

    // Mengarahkan tampilan ke hasil
    hasilGenerator.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});

// Fungsi salin teks
async function salinTeks(teks, pesanSukses) {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(teks);
        } else {
            const textarea = document.createElement("textarea");

            textarea.value = teks;
            textarea.style.position = "fixed";
            textarea.style.opacity = "0";

            document.body.appendChild(textarea);
            textarea.select();

            const berhasil = document.execCommand("copy");
            textarea.remove();

            if (!berhasil) {
                throw new Error("Gagal menyalin teks.");
            }
        }

        status.textContent = pesanSukses;

    } catch (error) {
        status.textContent = "Gagal menyalin. Silakan coba kembali.";
    }
}

// Tombol salin link saja
btnCopyLink.addEventListener("click", function() {
    if (!linkUndangan) return;

    salinTeks(
        linkUndangan,
        "Link undangan berhasil disalin!"
    );
});

// Tombol salin pesan template
btnCopyPesan.addEventListener("click", function() {
    if (!pesanUndangan) return;

    salinTeks(
        pesanUndangan,
        "Pesan undangan berhasil disalin!"
    );
});

// Tombol kirim ke WhatsApp
btnWhatsapp.addEventListener("click", function() {
    if (!pesanUndangan) return;

    const pesanEncoded = encodeURIComponent(pesanUndangan);

    const whatsappURL = "https://wa.me/?text=" + pesanEncoded;

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
});
