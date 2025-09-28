
import React, { useState } from 'react';

/**
 
 * @param {object} props 
 * @param {boolean} props.isOpen .
 * @param {function} props.onClose .
 * @param {string} props.recipientEmail 
 */
export function FeedbackModal({ isOpen, onClose, recipientEmail = 'rodriguesjulio635@gmail.com' }) {
    const [feedback, setFeedback] = useState('');
    const [emailSent, setEmailSent] = useState(false);

  
    if (!isOpen) {
        return null;
    }

     const handleSendFeedback = (e) => {
        e.preventDefault();

        const trimmedFeedback = feedback.trim();

        if (trimmedFeedback) {
        
            const recipientEmail = 'rodriguesjulio635@gmail.com';
            const emailSubject = encodeURIComponent("Feedback sobre a Página 'Sobre Nós'");
            const emailBody = encodeURIComponent(
                "Olá,\n\nTenho o seguinte feedback sobre o site:\n\n" + trimmedFeedback
            );

            
            const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipientEmail}&su=${emailSubject}&body=${emailBody}`;

         
            window.open(gmailUrl, '_blank'); 

           
            setEmailSent(true);
            setTimeout(() => {
                setFeedback('');
                setEmailSent(false);
                onClose();
            }, 1000); 
        } else {
            alert('Por favor, escreva seu feedback antes de enviar.');
        }
    };


    return (
       
       
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              
                <span className="close-btn" onClick={onClose}>&times;</span>
                
                <h2>Dê seu Feedback</h2>
                <p>Obrigado por nos ajudar a melhorar! Sua opinião é muito valiosa.</p>

                {emailSent ? (
                    <div className="success-message">
                        <p>✅ E-mail preparado! Por favor, finalize o envio no seu cliente de e-mail.</p>
                        <button className="cta-button" onClick={onClose}>Fechar</button>
                    </div>
                ) : (
                    <form onSubmit={handleSendFeedback}>
                        <div className="form-group">
                            <label htmlFor="feedback">Seu Feedback/Sugestão:</label>
                            <textarea
                                id="feedback"
                                rows="6"
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                placeholder="O que você gostou? O que podemos melhorar? Sugestões são bem-vindas!"
                                required
                            />
                        </div>
                        
                        <button type="submit" className="cta-button">
                            Enviar E-mail com Feedback
                        </button>
                        <p className="email-note">
                            *Você será redirecionado para uma aba com gmail para finalizar o envio.
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
}