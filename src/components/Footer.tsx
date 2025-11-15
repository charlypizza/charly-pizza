import { useState } from 'react';
import { Phone, Mail, Clock, X, Heart } from 'lucide-react';

type ModalType = 'mentions' | 'cgv' | 'confidentialite' | null;

export default function Footer() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [showCookieBanner, setShowCookieBanner] = useState(true);

  const modalContent = {
    mentions: {
      title: 'Mentions Légales',
      content: `INFORMATIONS GÉNÉRALES

Raison sociale : Pizza Charly
Siège social : Marseille, France

DIRECTEUR DE PUBLICATION

Le directeur de publication du site est le représentant légal de Pizza Charly.

HÉBERGEMENT

Ce site est hébergé par un prestataire professionnel répondant aux normes de sécurité et de confidentialité en vigueur.

PROPRIÉTÉ INTELLECTUELLE

L'ensemble des contenus présents sur ce site (textes, images, photographies, logos, vidéos) sont la propriété exclusive de Pizza Charly ou de ses partenaires. Toute reproduction, représentation, modification, publication ou adaptation totale ou partielle des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans l'autorisation écrite préalable de Pizza Charly.

COOKIES

Ce site utilise des cookies pour améliorer l'expérience utilisateur. En poursuivant votre navigation sur ce site, vous acceptez l'utilisation de cookies conformément à notre politique de confidentialité.

LIENS HYPERTEXTES

Les liens hypertextes présents sur le site Pizza Charly orientant les utilisateurs vers d'autres sites internet n'engagent pas la responsabilité de Pizza Charly quant au contenu de ces sites.

LITIGES

Les présentes mentions légales sont régies par le droit français. En cas de litige et à défaut d'accord amiable, le litige sera porté devant les tribunaux français compétents.`,
    },
    cgv: {
      title: 'Conditions Générales de Vente',
      content: `PRÉAMBULE

Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre Pizza Charly et toute personne physique ou morale souhaitant effectuer un achat (ci-après "le Client").

ARTICLE 1 - CHAMP D'APPLICATION

Les présentes CGV s'appliquent à toutes les ventes de produits alimentaires et boissons réalisées par Pizza Charly, que ce soit sur place, à emporter ou en livraison. Le fait de passer commande implique l'acceptation sans réserve des présentes CGV.

ARTICLE 2 - PRODUITS ET SERVICES

Pizza Charly propose une gamme de pizzas artisanales, de produits italiens et de boissons. Les photographies et descriptions des produits sont fournies à titre indicatif et peuvent varier légèrement. Pizza Charly s'engage à respecter les recettes traditionnelles et à utiliser des ingrédients de qualité.

ARTICLE 3 - COMMANDES

3.1 Modalités de commande
Les commandes peuvent être effectuées sur place dans nos restaurants, par téléphone ou via les canaux de communication disponibles.

3.2 Confirmation de commande
Toute commande fait l'objet d'une confirmation par Pizza Charly. En cas d'indisponibilité d'un produit, le Client sera informé dans les meilleurs délais et pourra choisir un produit de substitution ou annuler sa commande.

ARTICLE 4 - PRIX

4.1 Prix des produits
Les prix sont indiqués en euros TTC (Toutes Taxes Comprises) et incluent la TVA applicable au jour de la commande. Pizza Charly se réserve le droit de modifier ses prix à tout moment, étant entendu que les produits seront facturés sur la base des tarifs en vigueur au moment de la commande.

4.2 Frais de livraison
Pour les livraisons, des frais supplémentaires peuvent s'appliquer selon la distance et seront indiqués avant validation de la commande.

ARTICLE 5 - PAIEMENT

5.1 Modalités de paiement
Le paiement peut être effectué en espèces (dans la limite légale), par carte bancaire ou par tickets restaurant (sur place uniquement).

5.2 Sécurisation des paiements
Les paiements en ligne sont sécurisés. Les coordonnées bancaires ne sont jamais conservées par Pizza Charly.

ARTICLE 6 - LIVRAISON

6.1 Zone de livraison
La livraison est effectuée dans les zones géographiques desservies par nos restaurants.

6.2 Délais de livraison
Les délais de livraison sont communiqués à titre indicatif lors de la commande. Pizza Charly s'efforce de respecter ces délais mais ne saurait être tenu responsable en cas de retard dû à des circonstances indépendantes de sa volonté.

6.3 Réception de la commande
Le Client doit vérifier l'état de sa commande à la livraison. Toute anomalie doit être signalée immédiatement au livreur ou à Pizza Charly.

ARTICLE 7 - DROIT DE RÉTRACTATION

Conformément à l'article L221-28 du Code de la consommation, le droit de rétractation ne peut être exercé pour les denrées périssables et les produits alimentaires. Les commandes ne peuvent donc pas être annulées une fois la préparation commencée.

ARTICLE 8 - RÉCLAMATIONS

Toute réclamation relative à la qualité, la quantité ou la conformité des produits doit être formulée dans un délai de 24 heures suivant la livraison ou le retrait de la commande, par les moyens de contact disponibles.

ARTICLE 9 - RESPONSABILITÉ

Pizza Charly s'engage à respecter les normes d'hygiène et de sécurité alimentaire en vigueur. La responsabilité de Pizza Charly ne saurait être engagée en cas de mauvaise utilisation ou conservation des produits par le Client après livraison.

ARTICLE 10 - ALLERGÈNES

Pizza Charly informe ses clients que ses produits peuvent contenir des allergènes (gluten, lactose, fruits à coque, etc.). Les informations relatives aux allergènes sont disponibles en restaurant et sur demande.

ARTICLE 11 - DONNÉES PERSONNELLES

Les données personnelles collectées font l'objet d'un traitement informatique et sont utilisées uniquement pour la gestion des commandes. Conformément à la loi Informatique et Libertés et au RGPD, le Client dispose d'un droit d'accès, de rectification et de suppression de ses données.

ARTICLE 12 - FORCE MAJEURE

Pizza Charly ne pourra être tenu responsable de l'inexécution de ses obligations en cas de force majeure telle que définie par la jurisprudence française.

ARTICLE 13 - RÈGLEMENT DES LITIGES

Les présentes CGV sont soumises au droit français. En cas de litige, une solution amiable sera recherchée avant toute action judiciaire. À défaut, les tribunaux français compétents seront saisis.

ARTICLE 14 - MODIFICATION DES CGV

Pizza Charly se réserve le droit de modifier les présentes CGV à tout moment. Les CGV applicables sont celles en vigueur à la date de la commande.

Date de dernière mise à jour : Octobre 2025`,
    },
    confidentialite: {
      title: 'Politique de Confidentialité',
      content: `PRÉAMBULE

Pizza Charly accorde une grande importance à la protection de vos données personnelles. La présente politique de confidentialité a pour but de vous informer sur la manière dont nous collectons, utilisons et protégeons vos données conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés.

1. RESPONSABLE DU TRAITEMENT DES DONNÉES

Pizza Charly est responsable du traitement de vos données personnelles.

2. DONNÉES COLLECTÉES

2.1 Données collectées directement
Lors de vos interactions avec Pizza Charly, nous pouvons collecter les données suivantes :
- Nom et prénom
- Coordonnées de contact
- Adresse de livraison
- Historique de commandes
- Préférences alimentaires

2.2 Données collectées automatiquement
Lors de votre navigation sur notre site internet :
- Adresse IP
- Type de navigateur
- Pages visitées et durée de visite
- Cookies (voir section dédiée)

3. FINALITÉS DU TRAITEMENT

Vos données personnelles sont collectées et traitées pour les finalités suivantes :
- Gestion et traitement de vos commandes
- Communication concernant vos commandes (confirmation, suivi)
- Amélioration de nos services et de votre expérience client
- Envoi d'offres promotionnelles (avec votre consentement)
- Respect de nos obligations légales et comptables
- Gestion des réclamations et du service après-vente
- Statistiques et analyses de fréquentation

4. BASE LÉGALE DU TRAITEMENT

Le traitement de vos données repose sur :
- L'exécution du contrat de vente (gestion de commandes)
- Votre consentement (newsletters, cookies non essentiels)
- Nos intérêts légitimes (amélioration des services, statistiques)
- Le respect d'obligations légales (facturation, comptabilité)

5. DESTINATAIRES DES DONNÉES

Vos données personnelles sont destinées aux services internes de Pizza Charly. Elles peuvent également être partagées avec :
- Nos prestataires de services (hébergement, paiement, livraison)
- Les autorités administratives ou judiciaires en cas d'obligation légale

Aucune donnée n'est vendue ou louée à des tiers à des fins commerciales.

6. DURÉE DE CONSERVATION

Vos données sont conservées pendant :
- La durée nécessaire au traitement de votre commande
- 3 ans à compter de votre dernier contact pour les données clients
- 10 ans pour les données comptables et fiscales (obligation légale)
- Les cookies sont conservés 13 mois maximum

Au-delà de ces durées, vos données sont supprimées ou anonymisées.

7. SÉCURITÉ DES DONNÉES

Pizza Charly met en œuvre toutes les mesures techniques et organisationnelles appropriées pour garantir la sécurité de vos données et les protéger contre toute destruction, perte, altération, divulgation ou accès non autorisé :
- Chiffrement des données sensibles (SSL/TLS)
- Accès restreint aux données personnelles
- Sauvegardes régulières et sécurisées
- Formation du personnel au RGPD
- Audits de sécurité réguliers

8. VOS DROITS

Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des droits suivants :

8.1 Droit d'accès
Vous pouvez obtenir une copie de vos données personnelles.

8.2 Droit de rectification
Vous pouvez demander la correction de données inexactes ou incomplètes.

8.3 Droit à l'effacement
Vous pouvez demander la suppression de vos données dans certains cas.

8.4 Droit à la limitation du traitement
Vous pouvez demander de limiter l'utilisation de vos données.

8.5 Droit à la portabilité
Vous pouvez récupérer vos données dans un format structuré.

8.6 Droit d'opposition
Vous pouvez vous opposer au traitement de vos données pour des motifs légitimes.

8.7 Droit de retirer votre consentement
Vous pouvez retirer votre consentement à tout moment sans affecter la licéité du traitement effectué avant le retrait.

8.8 Exercice de vos droits
Pour exercer vos droits, contactez-nous par les moyens de communication disponibles.

Vous devrez joindre une copie d'une pièce d'identité. Nous vous répondrons dans un délai d'un mois maximum.

8.9 Droit de réclamation
Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la CNIL (Commission Nationale de l'Informatique et des Libertés) : www.cnil.fr

9. COOKIES

9.1 Qu'est-ce qu'un cookie ?
Un cookie est un petit fichier texte déposé sur votre terminal lors de la visite d'un site internet. Il permet de mémoriser des informations relatives à votre navigation.

9.2 Types de cookies utilisés
- Cookies essentiels : nécessaires au fonctionnement du site
- Cookies de performance : statistiques de fréquentation
- Cookies fonctionnels : mémorisation de vos préférences

9.3 Gestion des cookies
Vous pouvez accepter ou refuser les cookies via le bandeau de consentement ou paramétrer votre navigateur pour bloquer les cookies. Le refus des cookies essentiels peut affecter le fonctionnement du site.

10. TRANSFERTS DE DONNÉES HORS UE

Vos données sont hébergées et traitées en France. En cas de transfert vers des pays tiers, Pizza Charly s'assure que des garanties appropriées sont en place (clauses contractuelles types de la Commission européenne).

11. MINEURS

Nos services ne sont pas destinés aux mineurs de moins de 15 ans. Nous ne collectons pas sciemment de données concernant des mineurs sans le consentement des parents.

12. MODIFICATIONS DE LA POLITIQUE

Pizza Charly se réserve le droit de modifier la présente politique de confidentialité à tout moment. La version en vigueur est celle accessible sur notre site internet. Toute modification substantielle vous sera notifiée.

13. CONTACT

Pour toute question concernant cette politique de confidentialité ou le traitement de vos données personnelles, contactez-nous par les moyens disponibles sur notre site.

Date de dernière mise à jour : Octobre 2025`,
    },
  };

  return (
    <>
      <footer id="contact" className="bg-[#bd0926] text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center md:items-start">
              <img
                src="https://lh3.googleusercontent.com/pw/AP1GczMCCRC_9NYtXy8BHffQlk0hpS4dHOYNPIfyovxbBl2f2EwFp3GACVRZo4YzV-hvHzKuAsAcTcAPcFw2F8W4k-apbD6dTmw5pCoRqIuTfSGei5ZHukRR0LlnlmC_bCl0x-tO0eXro7mlRwlyA6Scymrw=w422-h417-s-no-gm?authuser=0"
                alt="Pizza Charly"
                className="h-40 w-auto"
              />
              <p className="mt-3 text-base opacity-80 italic">
                Depuis 1962, l'histoire continue.
              </p>
              <div className="mt-4 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 text-base">
                  <Phone size={20} />
                  <span>+33 9 84 20 79 62</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="space-y-3 text-base">
                <div>
                  <h5 className="font-semibold mb-2">Pizza Charly - Noailles</h5>
                  <p className="opacity-90">Lun-Ven : 09h-23h</p>
                  <p className="opacity-90">Sam : 09h-21h</p>
                  <p className="opacity-90">Dim : Fermé</p>
                </div>

                <div>
                  <h5 className="font-semibold mb-2">Pizza Charly - Le Panier</h5>
                  <p className="opacity-90">Tous les jours : 09h-22h</p>
                </div>

                <div>
                  <h5 className="font-semibold mb-2">Pizza Charly - Opéra</h5>
                  <p className="opacity-90">Lun-Jeu : 09h-23h</p>
                  <p className="opacity-90">Ven-Sam : 09h-00h</p>
                  <p className="opacity-90">Dim : Fermé</p>
                </div>
              </div>
            </div>

            <div className="text-center md:text-right">
              <h4 className="text-base font-semibold mb-4">Informations</h4>
              <div className="space-y-2 text-base">
                <button
                  onClick={() => setActiveModal('mentions')}
                  className="block w-full md:w-auto md:ml-auto hover:opacity-70 transition-opacity duration-300"
                >
                  Mentions légales
                </button>
                <button
                  onClick={() => setActiveModal('cgv')}
                  className="block w-full md:w-auto md:ml-auto hover:opacity-70 transition-opacity duration-300"
                >
                  CGV
                </button>
                <button
                  onClick={() => setActiveModal('confidentialite')}
                  className="block w-full md:w-auto md:ml-auto hover:opacity-70 transition-opacity duration-300"
                >
                  Politique de confidentialité
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col md:flex-row justify-between items-center text-sm opacity-70 gap-4">
            <p>&copy; 2025 Pizza Charly. Tous droits réservés.</p>
            <a
              href="https://www.vasseo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:opacity-70 transition-opacity duration-300 cursor-pointer"
            >
              Created with <Heart size={16} className="fill-white" /> by Vasseo
            </a>
          </div>
        </div>
      </footer>

      {activeModal && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto relative animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveModal(null)}
              className="sticky top-4 right-4 float-right bg-[#bd0926] text-white p-2 rounded-full hover:bg-[#9d0720] transition-all duration-300 hover:scale-110"
            >
              <X size={24} />
            </button>
            <div className="p-8">
              <h2 className="text-3xl font-bold text-[#bd0926] mb-6">
                {modalContent[activeModal].title}
              </h2>
              <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                {modalContent[activeModal].content}
              </div>
            </div>
          </div>
        </div>
      )}

      {showCookieBanner && (
        <div className="fixed bottom-4 left-4 right-4 md:bottom-6 md:left-auto md:right-6 bg-[#bd0926] text-white py-4 px-6 rounded-2xl z-40 shadow-2xl md:max-w-sm animate-slideUp">
          <button
            onClick={() => setShowCookieBanner(false)}
            className="absolute top-2 right-2 text-white/80 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
          <p className="text-sm mb-4 pr-4">
            Ce site utilise des cookies pour améliorer votre expérience. En continuant votre navigation, vous acceptez leur utilisation.
          </p>
          <button
            onClick={() => setShowCookieBanner(false)}
            className="w-full bg-white text-[#bd0926] px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300"
          >
            J'accepte
          </button>
        </div>
      )}
    </>
  );
}
