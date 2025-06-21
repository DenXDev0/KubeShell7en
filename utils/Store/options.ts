import { Variable, readFile, writeFile, monitorFile } from "astal";

// Mendeklarasikan path file dan state untuk data file
const FILE_PATH = "utils/options.json";

export const optionsStore = {
  data: Variable({}),
  // #-------------------#
  // # Fungsi untuk Membaca File #
  // #-------------------#
  read() {
    try {
      // Mencoba membaca dan mengurai JSON dari file
      const dataFile = JSON.parse(readFile(FILE_PATH)) ?? {};
      this.data.set(dataFile); // Memperbarui state data file
      return dataFile;
    } catch (error) {
      // Menangani error jika file tidak ditemukan atau rusak
      print("⚠️ File tidak ditemukan atau rusak. Menggunakan daftar kosong.");
      return {};
    }
  },

  // #-------------------#
  // # Fungsi untuk Menulis File #
  // #-------------------#
  write(data) {
    try {
      // Menulis data ke dalam file
      writeFile(FILE_PATH, JSON.stringify(data, null, 2));
      this.data.set(data); // Memperbarui state data file
      print("✅ Tugas disimpan.");
    } catch (e) {
      // Menangani error jika gagal menyimpan file
      print("❌ Gagal menyimpan tugas:", e);
    }
  },

  // #-----------------------#
  // # Fungsi untuk Memantau Perubahan File #
  // #-----------------------#
  monitor(callback) {
    monitorFile(FILE_PATH, () => {
      print("🔁 File berubah, memuat ulang...");
      callback(this.read()); // Memanggil kembali ketika file berubah
    });
  },

  // #----------------------#
  // # Mengambil Data Saat Ini #
  // #----------------------#
  getData() {
    return this.data.get();
  }
};
