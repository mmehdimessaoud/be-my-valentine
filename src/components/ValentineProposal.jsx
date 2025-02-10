import React, { useState } from 'react';
import { Heart, X, Check, Stars, Coffee, Gift, Music, Calendar, Clock, Pizza } from 'lucide-react';

const ValentineProposal = () => {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [allAnswered, setAllAnswered] = useState(false);
  const [responses, setResponses] = useState([]);
  const [showCopied, setShowCopied] = useState(false);

  const phrases = [
    "Non",
    "Tu es sûre ?",
    "Vraiment sûre ?",
    "Réfléchis encore !",
    "S'il te plaît ? 🥺",
    "Je serai triste...",
    "Mon cœur se brise !",
    "Tu me fais pleurer...",
    "Je ne peux pas vivre sans toi !",
    "Une dernière chance ?",
    "Je t'en supplie !",
    "Je ferai n'importe quoi !",
    "Je t'offrirai des chocolats !",
    "Et des fleurs aussi !",
    "Et des câlins infinis !",
    "Je ne peux plus continuer... 💔"
  ];

  const followUpQuestions = [
    {
      question: "On commence par un dîner vendredi soir ?",
      icon: Pizza,
      options: {
        yes: "Restaurant romantique",
        no: "Pizza et film"
      },
      yesResponse: "Super ! Je connais un endroit parfait pour nous deux 🍽️✨",
      noResponse: "Une soirée cozy à la maison, c'est tout aussi romantique ! 🍕🎬"
    },
    {
      question: "Demain matin, on se retrouve pour un café ensemble ?",
      icon: Coffee,
      options: {
        yes: "Café en ville",
        no: "Chocolat chaud"
      },
      yesResponse: "Parfait ! Je connais un super café pour bien commencer la journée ☕",
      noResponse: "Un bon chocolat chaud alors ? Avec des marshmallows ! 🍫"
    },
    {
      question: "Pour l'après-midi, bowling ou patinoire ?", 
      icon: Coffee,
      options: {
        yes: "Bowling",
        no: "Patinoire"
      },
      yesResponse: "Strike ! On va bien s'amuser au bowling ! 🎳",
      noResponse: "La patinoire c'est parfait ! Je te tiendrai la main si tu veux 🎭⛸️"
    }
  ];

  const getNoButtonText = () => phrases[Math.min(noCount, phrases.length - 1)];

  const handleNoClick = () => {
    if (!yesPressed) {
      setNoCount(noCount + 1);
      setPosition({
        x: Math.random() * (window.innerWidth - 100),
        y: Math.random() * (window.innerHeight - 100)
      });
    }
  };

  const handleYesClick = () => setYesPressed(true);

  const handleFollowUpResponse = (isYes) => {
    const currentQ = followUpQuestions[currentQuestion];
    const response = isYes ? currentQ.yesResponse : currentQ.noResponse;
    
    setResponses([...responses, {
      question: currentQ.question,
      response: response
    }]);

    if (currentQuestion < followUpQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(curr => curr + 1);
      }, 1000);
    } else {
      setTimeout(() => {
        setAllAnswered(true);
      }, 1000);
    }
  };

  const handleShare = () => {
    const textResponses = responses.map(r => 
      `💭 ${r.question}\n💝 ${r.response}`
    ).join('\n\n');

    const fullText = `
✨ Notre Programme de Saint-Valentin ✨

Chère Océane,
${yesPressed ? 'Tu as fait de moi la personne la plus heureuse en disant OUI! 💖' : 'J\'attends toujours ton oui avec impatience 💝'}

Notre planning :
${textResponses}

Avec tout mon amour 💕
    `.trim();

    navigator.clipboard.writeText(fullText);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  if (allAnswered) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50 text-center p-4">
        <div className="animate-bounce mb-8">
          <Heart className="w-32 h-32 text-red-500" fill="currentColor" />
        </div>
        <h1 className="text-4xl font-bold text-pink-600 mb-4">
          Océane, tu es extraordinaire ! ❤️
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          Notre Saint-Valentin sera magique !
        </p>
        
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Notre programme :</h3>
          <div className="space-y-4 text-gray-600">
            {responses.map((resp, idx) => (
              <div key={idx} className="p-2 border-b">
                <p className="font-medium">{resp.question}</p>
                <p className="italic">{resp.response}</p>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleShare}
          className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full transition-all flex items-center justify-center"
        >
          {showCopied ? "Programme copié ! 📋" : "Copier notre programme 💌"}
        </button>
      </div>
    );
  }

  if (yesPressed && !allAnswered) {
    const CurrentIcon = followUpQuestions[currentQuestion].icon;
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50 text-center p-4">
        <div className="max-w-md w-full space-y-8">
          <CurrentIcon className="w-16 h-16 text-pink-500 mx-auto" />
          <h2 className="text-2xl font-bold text-pink-600 mb-4">
            {followUpQuestions[currentQuestion].question}
          </h2>
          
          {responses.length > 0 && (
            <div className="mb-8">
              {responses.map((resp, idx) => (
                <div key={idx} className="text-gray-600 mb-2 italic">
                  {resp.response}
                </div>
              ))}
            </div>
          )}
          
          <div className="space-y-4">
            <button
              onClick={() => handleFollowUpResponse(true)}
              className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full text-lg font-semibold w-full transition-all"
            >
              {followUpQuestions[currentQuestion].options.yes}
            </button>
            <button
              onClick={() => handleFollowUpResponse(false)}
              className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-full text-lg font-semibold w-full transition-all"
            >
              {followUpQuestions[currentQuestion].options.no}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50 p-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-4">
          <Heart className="w-20 h-20 text-red-500 mx-auto animate-pulse" fill="currentColor" />
          <h1 className="text-4xl font-bold text-pink-600">Océane</h1>
          <h2 className="text-3xl font-bold text-pink-500">Veux-tu être ma Valentine ?</h2>
          <p className="text-lg text-gray-700 mt-4">
            Chaque moment avec toi fait battre mon cœur plus fort 💖
          </p>
        </div>
        
        <div className="flex flex-col items-center space-y-4">
          <button
            onClick={handleYesClick}
            className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full text-lg font-semibold transform hover:scale-110 transition-all flex items-center"
          >
            <Check className="w-5 h-5 mr-2" />
            Oui, bien sûr !
          </button>
          
          <button
            onClick={handleNoClick}
            className="bg-gray-400 hover:bg-gray-500 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all flex items-center"
            style={{
              position: noCount ? 'absolute' : 'relative',
              left: position.x,
              top: position.y,
            }}
          >
            <X className="w-5 h-5 mr-2" />
            {getNoButtonText()}
          </button>
        </div>
        
        {noCount > 0 && (
          <div className="text-pink-600 italic mt-4">
            {noCount === 1 ? "Essaie encore ! 😊" : "Le bouton 'Non' devient plus difficile à attraper ! 😅"}
          </div>
        )}
      </div>
    </div>
  );
};

export default ValentineProposal;