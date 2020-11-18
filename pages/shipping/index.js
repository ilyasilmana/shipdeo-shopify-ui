import React, { useState, useCallback } from "react";

import {
  Autocomplete,
  Card,
  Button,
  Form,
  FormLayout,
  Icon,
  Layout,
  OptionList,
  Page,
  Stack,
  Spinner,
  TextField,
} from "@shopify/polaris";
import { SearchMinor } from "@shopify/polaris-icons";

export default function ShippingComponent() {
  const [address, setAddress] = useState("");
  const [subdistrictCode, setSubdistrictCode] = useState("");
  const [city, setCity] = useState("");
  const [cityCode, setCityCode] = useState("");
  const [province, setProvince] = useState("");
  const [provinceCode, setProvinceCode] = useState("");
  const [location, setLocation] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");

  const [courierReady, setCourierReady] = useState(false);
  const [deselectedOptions, setDeselectedOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState(deselectedOptions);
  const [textFieldValue, setTextFieldValue] = useState(deselectedOptions);
  const [options, setOptions] = useState([]);

  const updateText = useCallback(
    (value) => {
      //console.log(value)
      setTextFieldValue(value);

      if (value === "") {
        setOptions(deselectedOptions);
        return;
      }

      const filterRegex = new RegExp(value, "i");
      const resultOptions = deselectedOptions.filter((option) =>
        option.label.match(filterRegex)
      );
      setOptions(resultOptions);
    },
    [deselectedOptions]
  );

  const updateSelection = useCallback((selected) => {
    const data_loc = selected.toString().split("/");
    const data_sub = data_loc[0].split("-");
    const data_city = data_loc[1].split("-");
    console.log(data_city);
    const data_prov = data_loc[2].split("-");
    setSubdistrictCode(data_sub[0]);
    setTextFieldValue(data_sub[1]);
    setCityCode(data_city[0]);
    setCity(data_city[1]);
    setProvinceCode(data_prov[0]);
    setProvince(data_prov[1]);
  }, []);

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label="Subdistrict"
      value={textFieldValue}
      prefix={<Icon source={SearchMinor} color="inkLighter" />}
      placeholder="Search"
    />
  );

  const handleFieldChange = useCallback((value, id) => {
    switch (id) {
      case 'address': setAddress(value); break;
      case 'location': setLocation(value); break;
      case 'phoneNumber': setPhoneNumber(value); break;
      case 'zipCode': setZipCode(value); break;
      case 'email': setEmail(value); break;
      case 'note': setNote(value); break;
    }
  }, []);

  const [courier, setCourier] = useState([]);
  const onChangeCourier = useCallback((value) => setCourier(value), []);

  const ChoiceLabel = (props) => (
    <div>
      <img src={props.src} className="ship-method-courier" />
      <style jsx>
        {`
          div {
            width: 100%;
            height: 32px;
            display: flex;
            align-items: center;
          }

          img {
            max-height: 32px;
            max-width: 100px;
            margin: auto;
          }
        `}
      </style>
    </div>
  );

  const choiceCouriers = [
    { label: <ChoiceLabel src="/img/couriers/Sicepat.png" />, value: 'sicepat' },
    { label: <ChoiceLabel src="/img/couriers/SAP.png" />, value: 'sap' },
    { label: <ChoiceLabel src="/img/couriers/JnT.png" />, value: 'jnt' },
    { label: <ChoiceLabel src="/img/couriers/Ninja.png" />, value: 'ninja' },
    { label: <ChoiceLabel src="/img/couriers/Gosend.png" />, value: 'gosend' },
  ];

  const swalFire = () => {
    swal.fire({
      title: <p>Hello World</p>,
      footer: 'Copyright 2018',
      onOpen: () => {
        swal.clickConfirm()
      }
    }).then(() => {
      return swal.fire(<p>Shorthand works too</p>)
    })
  }

  React.useEffect(() => {
    setTimeout(() => setCourier(['sicepat']), 1000);
    setTimeout(() => setCourier(['sap']), 2000);
  }, []);

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Card title="Shipping Information" sectioned>
            <Form onSubmit={swalFire}>
              <FormLayout>
                <TextField
                  id="address"
                  label="Address"
                  value={address}
                  onChange={handleFieldChange}
                />
              </FormLayout>
              <div style={{ paddingTop: '10px' }}></div>
              <FormLayout>
                <FormLayout.Group>
                  <Autocomplete
                    options={options}
                    selected={selectedOptions}
                    onSelect={updateSelection}
                    textField={textField}
                  />
                  <TextField
                    label="Province"
                    value={province}
                    disabled
                  />
                </FormLayout.Group>
              </FormLayout>
              <div style={{ paddingTop: '10px' }}></div>
              <FormLayout>
                <FormLayout.Group>
                  <TextField
                    label="City"
                    value={city}
                    disabled
                  />
                  <TextField
                    id="zipCode"
                    label="ZIP Code"
                    type="number"
                    value={zipCode}
                    onChange={handleFieldChange}
                  />
                </FormLayout.Group>
              </FormLayout>
              <div style={{ paddingTop: '10px' }}></div>
              <FormLayout>
                <FormLayout.Group>
                  <TextField
                    id="phoneNumber"
                    label="Phone Number"
                    value={phoneNumber}
                    onChange={handleFieldChange}
                  />
                  <TextField
                    id="email"
                    label="Email"
                    value={email}
                    onChange={handleFieldChange}
                  />
                </FormLayout.Group>
              </FormLayout>
              <div style={{ paddingTop: '10px' }}></div>
              <FormLayout>
                <TextField
                  id="note"
                  label="Note"
                  value={note}
                  onChange={handleFieldChange}
                  multiline={5}
                />
              </FormLayout>
              <br />
              <Stack>
                <Stack.Item fill></Stack.Item>
                <Stack.Item>
                  <Button primary submit>Save</Button>
                </Stack.Item>
              </Stack>
            </Form>
          </Card>
        </Layout.Section>
        <Layout.Section secondary>
          <Card title="Select Courier" sectioned>
            <OptionList
              allowMultiple
              options={choiceCouriers}
              selected={courier}
              onChange={onChangeCourier}
            />
            <br />
            <Stack distribution="center">
              <Button primary submit>Save</Button>
            </Stack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
