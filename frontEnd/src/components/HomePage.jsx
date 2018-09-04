import React from 'react';
import { Grid, Row, Col, Tabs, Tab } from 'react-bootstrap';
import './HomePage.scss';



export default class Homepage extends React.Component {
    render() {
        return (
            <div className="HomePage__cnt">

              <Grid>

                <Tabs id="Homepage__tabs" animation={false} bsStyle="tabs">
                  <Tab eventKey={1} title={'О сайте'}>
                    <p>На этом сайте я предлагаю изделия современной электроники, в основном изготовленные в Китае.</p>
                    <p>Я подбираю изделия которые, на мой взгляд, будут полезны для широкого круга покупателей. Эти изделия я продаю на сайтах ОЛХ и SkyLots.</p>
                    <p>Ссылка на <a href="https://skylots.org/search.php?seller_id=23558969&catid=0" target="_blank">мои объявления на SkyLots</a>.</p>
                    <p>Ссылка на <a href="https://modernelectronics.olx.ua/" target="_blank">мои объявления на ОЛХ</a>.</p>
                    <p>Сразу оговорюсь, что по ссылке на ОЛХ представлены далеко не все мои объявления.</p>
                    <p>Учитывая специфические требования ОЛХ на размещение объявлений, часть моих объявлений размещают мои партнеры. Если вы нашли на этом сайте интересующее вас изделие и не видите его в моих объявлениях на ОЛХ - обратитесь ко мне (см. раздел Контакты) и я дам ссылку на нужное изделие в объявлениях партнера.</p>
                  </Tab>

                  <Tab eventKey={2} title={'Цены'}>
                    <p>Цены указанные на товары этом сайте будут ниже цен указанных в объявлениях SkyLots. Это связано с тем, что в цену в объявлении на SkyLots заложена комиссия за продажу (как правило 4% от стоимости). Поэтому если вы оформляете покупку через SkyLots - это нужно учитывать.</p>
                    <p>В некоторых случаях я предоставляю небольшую скидку при покупке нескольких единиц товара. Вопрос предоставления скидки и ее размер в каждом конкретном случае решается индивидуально. В некоторых случаях в качестве скидки может быть моя оплата доставки Новой почтой.</p>
                    <p>Сайт находится в стадии разработки и не весь его функционал реализован. Пока из списка категорий товаров можно перейти на список товаров в выбранной категории и затем на описапние конкретного товара. Если фотографию в описании товара хочется увидеть крупнее - щелчок на ней правой кнопкой мыши и из контекстного меню "Открыть картинку в новой вкладке"</p>
                  </Tab>

                  <Tab eventKey={3} title={'Как купить'}>
                    <p>Прежде всего - у меня нет магазина или торговых точек на рынке.</p>
                    <p>Если вы живете в Кропивницком (Кировоград), или бываете в городе, то покупку можно осуществить при личной, предварительно согласованной встрече - "из рук в руки".</p>
                    <p>Если вы живете в другом населенном пункте, то доставка возможна либо Укрпочтой, либо Новой почтой (по выбору покупателя). Другими службами я не отправляю. Расходы по доставке, как правило несет покупатель (если я не предоставил вам в качестве бонуса мою оплату доставки Новой почтой).</p>
                    <p>Следует заметить, что доставка Укрпочтой заметно дешевле, чем Новой почтой и не менее надежна. Укрпочта предоставляет <a href="http://ukrposhta.ua/ua/vidslidkuvati-forma-poshuku" target="_blank">сервис отслеживания отправлений</a>, также, как и <a href="https://novaposhta.ua/tracking" target="_blank">Новая почта</a>.</p>
                    <p>Оплата за купленный товар обычно осуществляется на мою банковскую карту (карта Приватбанка). В некоторых случаях возможна оплата наложенным платежом, причем как при доставке Новой почтой, так и Укрпочтой.</p>
                    <p>В случае оплаты наложенным платежом я иногда прошу маленький аванс (30-70 грн.), как гарантию, что посылка будет забрана покупателем. Варианты доставки и оплаты в каждом конкретном случае определяются индивидуально.</p>
                    <p>Для некоторых товаров, которые продаются через сайт ОЛХ и для них включен сервис ОЛХ-доставка - вы можете воспользоваться этим сервисом.</p>
                    <p>Доставка в этом случае осуществляется Новой почтой, а стоимость доставки несколько дешевле, чем доставка с наложенным платежом. Подробнее об ОЛХ-доставке можно прочесть на сайте ОЛХ <a href="https://www.olx.ua/delivery/?campname=OLX&camplink=VC_delivery" target="_blank">по ссылке</a>.</p>
                  </Tab>
                </Tabs>

              </Grid>


            </div>

        );
    }
}
