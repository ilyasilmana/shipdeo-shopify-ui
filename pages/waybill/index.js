import React from 'react';
import {
  Button,
  Card,
  Form,
  FormLayout,
  Layout,
  Page,
  RadioButton,
  Spinner,
  Stack,
  TextContainer,
  TextField,
  TextStyle
} from '@shopify/polaris';
import { swalError } from '../../src/components/common/swal';
import TrackingHistory from '../../src/components/main/waybill/tracking-history';

export default class CheckAwb extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      courier: '',
      courierOption: [],
      courierOptionReady: false,
      isFeatureActivated: false,
      ready: false,
      shippingInformation: {},
      waybillNumber: '',
      waybillLoading: false,
      waybillFirstLoaded: false,
    }
  }

  async componentDidMount() {
    // Simulating if waybill feature is activated
    const isFeatureActivated = true;

    this.setState({
      ready: true,
      isFeatureActivated
    });

    if (isFeatureActivated) {
      // Load couriers
      await new Promise((y,n) => setTimeout(() => y(), 2000));

      this.setState({
        courierOption: dummyCourier.list,
        courierOptionReady: true,
      });
    }
  }

  handleCourierChange = (checked, value) => {
    this.setState({ courier: value });
  }

  handleSubmit = async () => {
    const { courier, waybillNumber } = this.state;

    if (courier === '') {
      swalError({ title: 'Silahkan pilih salah satu kurir.' });
    }
    else if (waybillNumber === '') {
      swalError({ title: 'Nomor resi kosong.' });
    }
    else {
      console.log({ courier, waybillNumber });

      this.setState({ waybillLoading: true });
      
      // await
      await new Promise((y,n) => setTimeout(() => y(), 2000));
      
      this.setState({
        shippingInformation: shippingInfo,
        waybillFirstLoaded: true,
        waybillLoading: false
      });
      this.scrollToWaybillInfo();
    }
  }

  scrollToWaybillInfo = () => {
    setTimeout(() => {
      const offsetTop = document.getElementById('waybill-information').offsetTop;
      scroll({ top: offsetTop, behavior: 'smooth' });

      console.log(this.state.shippingInformation)
    }, 10);
  }

  renderCouriers = (couriers) => {
    const courierChunks = chunk(couriers, 4);

    return courierChunks.map((chunklet, i) => (
      <FormLayout.Group condensed key={i}>
        {chunklet.map((courierItem, j) => (
          <RadioButton
            key={`${i}-${j}`}
            label={<Label name={courierItem.code} />}
            id={courierItem.code}
            name="courier"
            onChange={this.handleCourierChange}
          />
        ))}
      </FormLayout.Group>
    ));
  }

  renderCheckAwb() {
    return (
      <Page narrowWidth>
        <Layout>
          <Layout.Section>
            <Card title="Cek Resi" sectioned>
              <Form onSubmit={this.handleSubmit}>
                <FormLayout>
                  {this.state.courierOptionReady
                    ? this.renderCouriers(this.state.courierOption)
                    : this.renderSpinner()
                  }
                </FormLayout>
                <FormLayout>
                  <Stack alignment="trailing">
                    <Stack.Item fill>
                      <TextField
                        label="Nomor Resi"
                        value={this.state.waybillNumber}
                        onChange={(value) => this.setState({ waybillNumber: value })}
                      />
                    </Stack.Item>
                    <Stack>
                      <Button primary submit loading={this.state.waybillLoading}>Cek Nomor Resi</Button>
                    </Stack>
                  </Stack>
                </FormLayout>
              </Form>
            </Card>
          </Layout.Section>
          <Layout.Section>
            {this.state.waybillFirstLoaded &&
              (
                <div id="waybill-information" style={{ paddingTop: '10px' }}>
                  <Card sectioned>
                    <Card.Subsection>
                      <Stack>
                        <Stack.Item fill>
                          <TextContainer spacing="tight">
                            <TextStyle variation="strong">Tanggal Pengiriman</TextStyle>
                            <p><TextStyle variation="subdued">{this.state.shippingInformation.send_date}</TextStyle></p>
                          </TextContainer>
                          <br />
                          <TextContainer spacing="tight">
                            <TextStyle variation="strong">Pengirim</TextStyle>
                            <p><TextStyle variation="subdued">{this.state.shippingInformation.sender}</TextStyle></p>
                          </TextContainer>
                        </Stack.Item>
                        <Stack.Item fill>
                          <TextContainer spacing="tight">
                            <TextStyle variation="strong">Asal</TextStyle>
                            <p><TextStyle variation="subdued">{this.state.shippingInformation.sender_address}</TextStyle></p>
                          </TextContainer>
                          <br />
                          <TextContainer spacing="tight">
                            <TextStyle variation="strong">Penerima</TextStyle>
                            <p><TextStyle variation="subdued">{this.state.shippingInformation.receiver_name}</TextStyle></p>
                          </TextContainer>
                        </Stack.Item>
                        <Stack.Item fill>
                          <TextContainer spacing="tight">
                            <TextStyle variation="strong">Tujuan</TextStyle>
                            <p><TextStyle variation="subdued">{this.state.shippingInformation.receiver_address}</TextStyle></p>
                          </TextContainer>
                        </Stack.Item>
                      </Stack>
                    </Card.Subsection>
                    <Card.Subsection>
                      <TrackingHistory data={this.state.shippingInformation.track_history}/>
                    </Card.Subsection>
                  </Card>
                </div>
              )
            }
          </Layout.Section>
        </Layout>
      </Page>
    );
  }

  renderSpinner = () => {
    return (
      <div style={{ width: '100%', display: 'flex', height: '120px', justifyContent: 'center', alignItems: 'center' }}>
        <Spinner accessibilityLabel="Loading Order List..." size="large" color="teal" />
      </div>
    );
  }

  renderFeatureNotActivated = () => {
    return (
      <Page title="Whoops">
        <Layout></Layout>
      </Page>
    )
  }

  render() {
    if (this.state.isFeatureActivated) {
      return this.renderCheckAwb()
    }
    else {
      return this.renderFeatureNotActivated();
    }
  }
}

const Label = ({ name }) => {
  return (
    <div style={{ width: '100px', height: '32px' }}>
      <img src={`img/couriers/${name}.png`} style={{ maxWidth: '100px', maxHeight: '32px' }} />
    </div>
  )
}

/**
 * @param {any[]} input 
 * @param {number} size
 * @return {any[]}
 */
const chunk = (input = [], size) => {
  if (input.length > 0) {
    return input.reduce((arr, item, i) => {
      if(i % size === 0) {
        return [...arr, [item]];
      }
      else {
        return [...arr.slice(0, -1), [...arr.slice(-1)[0], item]];
      }
    }, [])
  }
  else {
    return [];
  }
};

const shippingInfo = {"waybill_number":"000434236059","kodeasal":"CGK10000","kodetujuan":"BDO10120","service":"REG","estimasi":"2 - 4","weight":1,"partner":"Tokopedia","sender":"Fantech Official Store","sender_address":"DKI Jakarta","receiver_address":"Margaasih, Bandung","receiver_name":"Ilyas Ilmana","realprice":0,"totalprice":16000,"POD_receiver":"Paket diterima oleh [Ilyas - (KEL) Keluarga Serumah]","POD_receiver_time":"2020-08-09 12:33","send_date":"2020-08-08 19:10","track_history":[{"date_time":"2020-08-08 16:06","status":"PICKREQ","city":"Terima permintaan pick up dari [Tokopedia]"},{"date_time":"2020-08-08 17:18","status":"PICK","city":"Paket telah di pick up oleh [SIGESIT - Fajar triyadi]"},{"date_time":"2020-08-08 19:10","status":"IN","city":"Paket telah di input (manifested) di Jakarta Barat [Jakbar Tegal Alur]"},{"date_time":"2020-08-08 19:53","status":"OUT","city":"Paket keluar dari DKI Jakarta [Jakbar Tegal Alur]"},{"date_time":"2020-08-08 22:25","status":"IN","city":"Paket telah di terima di DKI Jakarta [Jakut Pluit 2 Hub]"},{"date_time":"2020-08-08 22:26","status":"OUT","city":"Paket keluar dari DKI Jakarta [Jakut Pluit 2 Hub]"},{"date_time":"2020-08-09 05:40","status":"IN","city":"Paket telah di terima di Bandung [Bandung Hub 1]"},{"date_time":"2020-08-09 06:17","status":"OUT","city":"Paket keluar dari Bandung [Bandung Hub 1]"},{"date_time":"2020-08-09 09:45","status":"IN","city":"Paket telah di terima di Bandung [Bandung Taman Kopo ]"},{"date_time":"2020-08-09 10:35","status":"ANT","city":"Paket dibawa [SIGESIT -  Ayep Rosadi Mustapa ]"},{"date_time":"2020-08-09 12:33","status":"DELIVERED","receiver_name":"Paket diterima oleh [Ilyas - (KEL) Keluarga Serumah]"}],"last_status":{"date_time":"2020-08-09 12:33","status":"DELIVERED","receiver_name":"Paket diterima oleh [Ilyas - (KEL) Keluarga Serumah]"},"perwakilan":"BDO","pop_sigesit_img_path":"https://sicepatmasterdata.s3.ap-southeast-1.amazonaws.com/images/employee/19050568.jpg","pod_sigesit_img_path":"https://sicepatmasterdata.s3.ap-southeast-1.amazonaws.com/images/employee/19122156.jpg","pod_sign_img_path":"https://sicepatmasterdata.s3.amazonaws.com/attachments/signaturePOD/000434236059","pod_img_path":"https://sicepatmasterdata.s3.amazonaws.com/attachments/photoPOD/000434236059"};

const dummyCourier = {
  "list": [
    {
      "_id": "5ee1cd8f440e42b88e10f233",
      "code": "jnt",
      "name": "J&T Express",
      "is_integrated": true,
      "description": "PT. A",
      "address": "jl. Raya",
      "phone": "0812312312",
      "email": "info@gosend.com",
      "website": "gosend.com",
      "features": {
        "generate_airwaybill": true,
        "pickup": true,
        "dropoff": false,
        "cancel_delivery": false,
        "check_tariff": true,
        "check_airwaybill": true,
        "is_cod": true
      },
      "createdAt": "2020-06-05T12:42:26.829Z",
      "updatedAt": "2020-06-05T12:42:26.829Z"
    },
    {
      "_id": "5eda3db203d75e001b898ad5",
      "code": "gosend",
      "name": "GoSend",
      "is_integrated": true,
      "description": "PT. A",
      "address": "jl. Raya",
      "phone": "0812312312",
      "email": "info@gosend.com",
      "website": "gosend.com",
      "features": {
        "generate_airwaybill": true,
        "pickup": true,
        "dropoff": false,
        "cancel_delivery": false,
        "check_tariff": true,
        "check_airwaybill": true
      },
      "createdAt": "2020-06-05T12:42:26.738Z",
      "updatedAt": "2020-06-05T12:42:26.738Z"
    },
    {
      "_id": "5eda3db203d75e001b898ad7",
      "code": "jx",
      "name": "J Express",
      "is_integrated": true,
      "description": "PT. A",
      "address": "jl. Raya",
      "phone": "0812312312",
      "email": "info@gosend.com",
      "website": "gosend.com",
      "features": {
        "generate_airwaybill": true,
        "pickup": true,
        "dropoff": false,
        "cancel_delivery": false,
        "check_tariff": true,
        "check_airwaybill": true,
        "is_cod": true
      },
      "createdAt": "2020-06-05T12:42:26.815Z",
      "updatedAt": "2020-06-05T12:42:26.815Z"
    },
    {
      "_id": "5ee1cd20440e42b88e10f138",
      "code": "ninja",
      "name": "Ninja Express",
      "is_integrated": true,
      "description": "PT. A",
      "address": "jl. Raya",
      "phone": "0812312312",
      "email": "info@gosend.com",
      "website": "gosend.com",
      "features": {
        "generate_airwaybill": true,
        "pickup": true,
        "dropoff": false,
        "cancel_delivery": true,
        "check_tariff": true,
        "check_airwaybill": true,
        "is_cod": true
      },
      "createdAt": "2020-06-05T12:42:26.829Z",
      "updatedAt": "2020-06-05T12:42:26.829Z"
    },
    {
      "_id": "5eda3db203d75e001b898ad6",
      "code": "jet",
      "name": "JET Express",
      "is_integrated": true,
      "description": "PT. A",
      "address": "jl. Raya",
      "phone": "0812312312",
      "email": "info@jet.com",
      "website": "jet.com",
      "features": {
        "generate_airwaybill": true,
        "pickup": true,
        "dropoff": false,
        "cancel_delivery": false,
        "check_tariff": true,
        "check_airwaybill": true,
        "is_cod": true
      },
      "createdAt": "2020-06-05T12:42:26.811Z",
      "updatedAt": "2020-06-05T12:42:26.811Z"
    },
    {
      "_id": "5eda3db203d75e001b898ad9",
      "code": "sicepat",
      "name": "Sicepat Express",
      "is_integrated": true,
      "description": "PT. SICEPAT EXPRESS INDONESIA",
      "address": "jl. Juanda",
      "phone": "0812312312",
      "email": "info@sicepat.com",
      "website": "sicepat.com",
      "features": {
        "generate_airwaybill": true,
        "pickup": true,
        "dropoff": true,
        "cancel_delivery": true,
        "check_tariff": true,
        "check_airwaybill": true,
        "is_cod": true
      },
      "wa_group_id": "LUNmOuKPM965do9ybQT9Dz",
      "createdAt": "2020-06-05T12:42:26.824Z",
      "updatedAt": "2020-06-05T12:42:26.824Z"
    },
    {
      "_id": "5f2bac43634fbf6cfc695a91",
      "code": "jne",
      "name": "JNE",
      "is_integrated": true,
      "description": "PT. A",
      "address": "jl. Raya",
      "phone": "0812312312",
      "email": "info@jne.com",
      "website": "jne.com",
      "features": {
        "generate_airwaybill": true,
        "pickup": true,
        "dropoff": true,
        "cancel_delivery": false,
        "check_tariff": true,
        "check_airwaybill": true,
        "is_cod": true
      },
      "createdAt": "2020-08-06T12:42:26.738Z",
      "updatedAt": "2020-08-06T12:42:26.738Z"
    },
    {
      "_id": "5ee71cb4a36f2d9a43f83251",
      "code": "anteraja",
      "name": "Anteraja",
      "is_integrated": true,
      "description": "PT. A",
      "address": "jl. Raya",
      "phone": "0812312312",
      "email": "info@gosend.com",
      "website": "gosend.com",
      "features": {
        "generate_airwaybill": true,
        "pickup": true,
        "dropoff": false,
        "cancel_delivery": true,
        "check_tariff": true,
        "check_airwaybill": true,
        "is_cod": false
      },
      "wa_group_id": "Hsd0DbiOm3KBnA1a6WMV1Y",
      "createdAt": "2020-06-05T12:42:26.829Z",
      "updatedAt": "2020-06-05T12:42:26.829Z"
    },
    {
      "_id": "5eda3db203d75e001b898ad8",
      "code": "sap",
      "name": "SAP Express",
      "is_integrated": true,
      "description": "PT. Sarana Apa Prestasi",
      "address": "jl. Juanda",
      "phone": "0812312312",
      "email": "info@sap.com",
      "website": "sap.com",
      "features": {
        "generate_airwaybill": true,
        "pickup": true,
        "dropoff": false,
        "cancel_delivery": false,
        "check_tariff": true,
        "check_airwaybill": true,
        "is_cod": true
      },
      "wa_group_id": "Bd4IeEZNHJnFudOIwqEq6Q",
      "createdAt": "2020-06-05T12:42:26.820Z",
      "updatedAt": "2020-06-05T12:42:26.820Z"
    }
  ],
  "total": 9
};

