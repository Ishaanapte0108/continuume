import React from 'react'
import Footer from '../components/Footer';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <section className="flex items-center justify-center flex-grow">
        <div className="text-center max-w-4xl px-4 py-12">
          <h1 className="text-3xl font-semibold mb-4 text-indigo-500">
            Who We Are
          </h1>
          <p className="text-lg leading-relaxed text-gray-700">
            Ledge is a platform provided by Continnume Consultancy Services for allowing students to interact with experts and provide a centralized place information sharing. Continuume Consultancy is started with the vision to give students a one-stop solution for all their Study Abroad Requirements. With our mentors having extensive experience in this domain, we assure quality of services to the student fraternity. We cater to only a limited set of students, ensuring individual mentoring needed at every stage.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
