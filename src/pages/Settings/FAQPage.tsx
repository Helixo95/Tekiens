import { IonContent, IonPage } from '@ionic/react'
import HeaderTitleBack from '../../components/HeaderTitleBack'

const FAQPage: React.FC = () => {
    return (
        <IonPage>
            <HeaderTitleBack back='/app/settings'>FAQ</HeaderTitleBack>
            <IonContent className="ion-padding justify-text">
                <div>
                    <h1 className='title'>Informations générales</h1>
                    <h5 className='second-title'>Qu'est-ce que tekiens.net et quel est son objectif ?</h5>
                    <span className='questionAnswer'>
                        Tekiens.net est le site de la vie étudiante de CY Tech.<br />
                        Le but de ce site est de centraliser les informations concernant les associations et les événements de l'école.
                    </span>
                </div>

                <div>
                    <h1 className='title'>Utilisation de la plateforme</h1>
                    <h5 className='second-title'>Comment puis-je ajouter mon association sur tekiens.net ?</h5>
                    <span className='questionAnswer'>
                        Pour ajouter votre association sur tekiens.net, vous devez contacter le bureau de l'association <a href='https://atilla.org/' target="_blank" rel="noreferrer0">Atilla</a>. <br />
                        La plateforme n'est actuellement dédiée qu'aux associations de CY Tech.
                    </span>
                </div>

                <div>
                    <h1 className='title'>Contribution et support</h1>
                    <h5 className='second-title'>Comment puis-je contribuer au projet ?</h5>
                    <span className='questionAnswer'>
                        Nous accueillons volontiers les contributions ! Consultez notre page GitLab pour trouver des opportunités d'aide. Vous pouvez soumettre des suggestions, des rapports de bugs ou même proposer des améliorations. <br />
                        Vous êtes intéressés pour découvrir le code, ou vous voulez simplement participer à l'amélioration de la plateforme ? Rejoignez nous en CY307 ou sur les internets !
                    </span>

                    <h5 className='second-title'>Comment puis-je trouver le code source de tekiens.net ?</h5>
                    <span className='questionAnswer'>
                        Le code source est disponible sur <a href='https://gitlab.com/ptlc8/tekiens-net' target="_blank" rel="noreferrer0">le dépôt public GitLab</a>. Vous pouvez le cloner, le fork, et contribuer sur la page du projet.
                    </span>

                    <h5 className='second-title'>Comment puis-je signaler un problème ou un bug ?</h5>
                    <span className="questionAnswer">
                        Si vous rencontrez un problème ou un bug, veuillez créer un rapport sur notre page GitLab dans la section des problèmes ou sur le serveur Discord d'Atilla. <br />
                        Décrivez le problème de manière détaillée, en incluant si possible les étapes pour le reproduire. Notre équipe examinera rapidement votre rapport.
                    </span>
                </div>

            </IonContent>
        </IonPage>
    )
}

export default FAQPage