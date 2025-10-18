'use client';

import React from 'react';
import Link from 'next/link';

export default function Header({ title, subtitle, showBackButton = false }) {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center mb-4">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-full p-4 shadow-lg">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
      </div>
      
      {showBackButton && (
        <div className="mb-4">
          <Link 
            href="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour à l'accueil
          </Link>
        </div>
      )}
      
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">EduPlatform</h1>
      <p className="text-lg text-gray-600 mb-6">Votre plateforme d'apprentissage en ligne</p>
      <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-800 mx-auto rounded-full"></div>
      
      {title && (
        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">{title}</h2>
      )}
      
      {subtitle && (
        <p className="text-gray-600 mb-6">{subtitle}</p>
      )}
    </div>
  );
}
