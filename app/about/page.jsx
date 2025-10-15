import React from 'react';
import Link from 'next/link';
import Navbar from '../components/navbar/page';

function About() {
  const features = [
    {
      id: 1,
      title: "Apprentissage aux Besoins",
      description: "Notre plateforme s'adapte parfaitement aux besoins individuels de chaque élève. Grâce à des algorithmes intelligents, nous personnalisons le contenu pédagogique selon le rythme d'apprentissage, les préférences et les objectifs de chaque étudiant.",
      image: "/api/placeholder/400/300",
      icon: "🎯"
    },
    {
      id: 2,
      title: "Accès aux Lives sur Demande",
      description: "Profitez de sessions de cours en direct avec nos enseignants qualifiés. Réservez des créneaux selon votre disponibilité et participez à des cours interactifs en temps réel, où vous pouvez poser vos questions et recevoir des réponses immédiates.",
      image: "/api/placeholder/400/300",
      icon: "📺"
    },
    {
      id: 3,
      title: "Interactivité Profs-Élèves",
      description: "Créez des liens forts entre enseignants et élèves grâce à nos outils de communication avancés. Partagez des ressources, suivez les progrès en temps réel et maintenez une collaboration étroite pour un apprentissage optimal.",
      image: "/api/placeholder/400/300",
      icon: "🤝"
    }
  ];

  return (
    <>
      <Navbar />
      <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* En-tête de section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            À Propos de Notre Plateforme
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les fonctionnalités qui font de notre plateforme éducative 
            un outil révolutionnaire pour l'apprentissage moderne.
          </p>
        </div>

        {/* Cartes des fonctionnalités */}
        <div className="space-y-16">
          {features.map((feature, index) => (
            <div 
              key={feature.id}
              className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12`}
            >
              {/* Image */}
              <div className="w-full lg:w-1/2">
                <div className="relative h-80 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-2xl overflow-hidden shadow-xl">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
                        {feature.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        {feature.title}
                      </h3>
                    </div>
                  </div>
                  <div className="absolute top-6 right-6">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <span className="text-2xl">{feature.icon}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contenu */}
              <div className="w-full lg:w-1/2">
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                    {feature.title}
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-1 bg-blue-600 rounded-full"></div>
                    <span className="text-blue-600 font-semibold">Fonctionnalité clé</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section des boutons d'accès */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Rejoignez Notre Communauté
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Choisissez votre espace et commencez votre parcours d'apprentissage 
            avec nous dès aujourd'hui.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
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
                <span className="text-lg">Espace Enseignant</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

export default About;