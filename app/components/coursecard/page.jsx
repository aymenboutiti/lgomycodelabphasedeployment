'use client';

import React, { useState } from 'react';

export default function CourseCard({
  title = 'Cours de Mathématiques',
  teacher = 'Mme Dupont',
  format = 'PDF', // 'PDF' | 'VIDÉO'
  classe = '9',
  matiere = 'Mathématiques',
  rating = 4.5,
  downloads = 128,
}) {
  const [expanded, setExpanded] = useState(false);

  const toggle = () => setExpanded((v) => !v);

  return (
    <article
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer"
      onClick={toggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && toggle()}
      aria-expanded={expanded}
    >
      {/* Header - always visible */}
      <div className="p-5 flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <div className="text-sm text-gray-600">Classe: {classe}</div>
        </div>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${format === 'PDF' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
          {format}
        </span>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className="px-5 pb-5 pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <span className="inline-flex w-6 h-6 items-center justify-center rounded-full bg-blue-600 text-white text-xs">P</span>
              <span>Professeur: <span className="font-medium text-gray-900">{teacher}</span></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex w-6 h-6 items-center justify-center rounded-full bg-amber-500 text-white text-xs">M</span>
              <span>Matière: <span className="font-medium text-gray-900">{matiere}</span></span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.034a1 1 0 00-1.175 0l-2.802 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.88 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              <span>Note: <span className="font-medium text-gray-900">{rating}</span>/5</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor"><path d="M3 3a1 1 0 00-1 1v10a2 2 0 002 2h12a1 1 0 001-1V8.414A2 2 0 0016.586 7L12 2.414A2 2 0 0010.586 2H4a1 1 0 00-1 1zm9 1.414L15.586 8H13a1 1 0 01-1-1V4.414z"/></svg>
              <span>Téléchargements: <span className="font-medium text-gray-900">{downloads}</span></span>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
