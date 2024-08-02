import { IonContent, IonPage } from '@ionic/react'
import HeaderTitleBack from '../../components/HeaderTitleBack'
import { useTranslation } from 'react-i18next'

const FAQPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <IonPage>
            <HeaderTitleBack back='/app/settings'>FAQ</HeaderTitleBack>
            <IonContent className="ion-padding justify-text">
                <div>
                    <h1 className='title'>{t('faq.part1.title')}</h1>
                    <h5 className='second-title'>{t('faq.part1.question1')}</h5>
                    <span className='questionAnswer' dangerouslySetInnerHTML={{ __html: t('faq.part1.answer1') }} />
                </div>

                <div>
                    <h1 className='title'>{t('faq.part2.title')}</h1>
                    <h5 className='second-title'>{t('faq.part2.question1')}</h5>
                    <span className='questionAnswer' dangerouslySetInnerHTML={{ __html: t('faq.part2.answer1') }} />
                </div>

                <div>
                    <h1 className='title'>{t('faq.part3.title')}</h1>
                    <h5 className='second-title'>{t('faq.part3.question1')}</h5>
                    <span className='questionAnswer' dangerouslySetInnerHTML={{ __html: t('faq.part3.answer1') }} />

                    <h5 className='second-title'>{t('faq.part3.question2')}</h5>
                    <span className='questionAnswer' dangerouslySetInnerHTML={{ __html: t('faq.part3.answer2') }} />

                    <h5 className='second-title'>{t('faq.part3.question3')}</h5>
                    <span className="questionAnswer" dangerouslySetInnerHTML={{ __html: t('faq.part3.answer3') }} />
                </div>

            </IonContent>
        </IonPage>
    )
}

export default FAQPage