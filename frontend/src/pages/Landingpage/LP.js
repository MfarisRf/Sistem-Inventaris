import React from 'react';
import Hero from '../../Component/Home/Hero';
import Navbarlp from '../../Component/Navbar';
import ProductImage from "../../Component/Assets/product_1.jpg"; // Gambar produk
import GiftCard from "../../Component/card1/gift-card";
import Activitiesimg from "../../Component/Assets/personal_image.jpg";

const LP = () => {
  return (
    <div style={{ width: '100%', backgroundColor: '#FAFAFA' }}>
      <Navbarlp />
      <Hero />
      <div className="bg-white py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Satori Rattan</h1>
          <p className="text-lg text-black">
            Satori Rattan is a contemporary furniture brand focusing on high quality handcrafted furniture made from rattan, carbon steel, and aluminum with synthetic or woven rope. Our skilled artisans have over 25 years of experience working with high-end companies in Europe, Japan, and the United States.
          </p>
        </div>
      </div>

      {/* Kartu Produk */}
      <div className="container mx-auto py-8">
        <h2 className="text-3xl font-semibold text-center mb-8">Produk Kami</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Kartu Produk 1 */}
          <div className="max-w-sm rounded overflow-hidden shadow-lg transition duration-300 ease-in-out transform hover:scale-105 flex">
            {/* Foto Produk di Sebelah Kiri */}
            <img className="w-1/3" src={ProductImage} alt="Product" />
            <div className="w-2/3 px-6 py-4">
              <div className="font-bold text-xl mb-2">Nama Produk</div>
              <p className="text-gray-700 text-base">Deskripsi singkat tentang produk Anda.</p>
              <div className="px-0 py-4">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#Kategori</span>
              </div>
            </div>
          </div>

          {/* Kartu Produk 2 */}
          <div className="max-w-sm rounded overflow-hidden shadow-lg transition duration-300 ease-in-out transform hover:scale-105 flex">
            {/* Foto Produk di Sebelah Kiri */}
            <img className="w-1/3" src={ProductImage} alt="Product" />
            <div className="w-2/3 px-6 py-4">
              <div className="font-bold text-xl mb-2">Nama Produk</div>
              <p className="text-gray-700 text-base">Deskripsi singkat tentang produk Anda.</p>
              <div className="px-0 py-4">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#Kategori</span>
              </div>
            </div>
          </div>

          {/* Kartu Produk 3 */}
          <div className="max-w-sm rounded overflow-hidden shadow-lg transition duration-300 ease-in-out transform hover:scale-105 flex">
            {/* Foto Produk di Sebelah Kiri */}
            <img className="w-1/3" src={ProductImage} alt="Product" />
            <div className="w-2/3 px-6 py-4">
              <div className="font-bold text-xl mb-2">Nama Produk</div>
              <p className="text-gray-700 text-base">Deskripsi singkat tentang produk Anda.</p>
              <div className="px-0 py-4">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#Kategori</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Foto dan Judul di Bawah Kartu Produk */}
      <div className="container mx-auto py-8 flex items-center">
        {/* Foto di Sebelah Kiri dengan Effect Drop Shadow */}
        <div className="w-1/3 shadow-lg">
          <img className="w-full" src={Activitiesimg} alt="Product" />
        </div>
        {/* Judul dan Paragraf di Sebelah Kanan */}
        <div className="w-2/3 px-6 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Activities</h2>
          <p className="text-gray-700 text-base">Satori Rattan support the Indonesian Ministry of Trade to exhibit export products at the IORA SUMMIT event on 5-7 March 2017 in Jakarta. In this event, the Seven Heads of State all sat on the chairs of Rattan Satori, Indonesia President Joko Widodo, Australia Prime Minister Malcolm Turnbull, Bangladesh Prime Minister Seikh Hasina Wazed, President of Mozambique Filipe Nyusi, VP Comoro Djaffar Ahmed Said Hasani, Seychelles Vice President Vincent Meriton, and President of South Africa Jacob G Zuma.</p>
</div>
</div>
</div>
);
}

export default LP;
