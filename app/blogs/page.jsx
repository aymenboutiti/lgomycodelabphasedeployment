import React from 'react';
import Image from 'next/image';

function Blogs() {
  const blogPosts = [
    {
      id: 1,
      title: "L'avenir de l'éducation numérique",
      excerpt: "Découvrez comment les nouvelles technologies transforment l'apprentissage et ouvrent de nouvelles perspectives éducatives pour les étudiants du monde entier.",
      image: "/api/placeholder/400/250",
      date: "15 Janvier 2024",
      category: "Innovation"
    },
    {
      id: 2,
      title: "Méthodes d'apprentissage adaptatives",
      excerpt: "Explorez les techniques d'apprentissage personnalisées qui s'adaptent au rythme et aux besoins spécifiques de chaque élève pour optimiser leur réussite.",
      image: "/api/placeholder/400/250",
      date: "10 Janvier 2024",
      category: "Pédagogie"
    },
    {
      id: 3,
      title: "Collaboration entre parents et enseignants",
      excerpt: "Apprenez comment renforcer la communication entre les familles et les éducateurs pour créer un environnement d'apprentissage optimal pour les enfants.",
      image: "/api/placeholder/400/250",
      date: "5 Janvier 2024",
      category: "Communauté"
    }
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* En-tête de section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nos Derniers Articles
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez nos insights sur l'éducation moderne et les meilleures pratiques pédagogiques
          </p>
        </div>

        {/* Grille des articles de blog */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article 
              key={post.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
            >
              {/* Image du blog */}
              <div className="relative h-48 bg-gradient-to-br from-blue-100 to-indigo-200">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Contenu de la carte */}
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {post.date}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <button className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
                  Lire la suite
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Bouton pour voir tous les articles */}
        <div className="text-center mt-12">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Voir tous les articles
          </button>
        </div>
      </div>
    </section>
  );
}

export default Blogs;