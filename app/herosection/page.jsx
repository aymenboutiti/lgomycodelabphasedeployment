import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

function Herosection() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Contenu principal - Titre, texte et image côte à côte */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          {/* Texte et titre */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Plateforme d'Éducation
              <span className="text-blue-600 block">Moderne</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Découvrez une nouvelle façon d'apprendre avec notre plateforme éducative innovante. 
              Connectez-vous à votre espace personnel et accédez à des ressources pédagogiques 
              adaptées à vos besoins.
            </p>
          </div>
          
          {/* Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md lg:max-w-lg">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
                <div className="aspect-square bg-gradient-to-br from-blue-100 to-indigo-200 rounded-xl flex items-center justify-center overflow-hidden">
                  {/* Image agrandie pour remplir toute la div */}
                  <Image
                    src="data:image/jpeg;base64,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"
                    alt="Éducation moderne"
                    width={480}
                    height={880}
                    className="rounded-xl object-cover mx-auto"
                  />
                  {/* ...ancien bloc SVG et texte... */}
                  {/* <div className="text-center">
                    <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Apprentissage</h3>
                    <p className="text-gray-600">Interactif et moderne</p>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Boutons d'accès */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            href="/students"
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center justify-center space-x-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-lg">Espace Élève</span>
            </div>
          </Link>
          
          <Link 
            href="/teachers"
            className="w-full sm:w-auto bg-white hover:bg-gray-50 text-blue-600 font-semibold py-4 px-8 rounded-lg border-2 border-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center justify-center space-x-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="text-lg">Espace Parent</span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Herosection;