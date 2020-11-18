import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, Collapsible, Layout, Form, FormLayout, RadioButton, Select, TextField } from '@shopify/polaris';

import { Card, CardBody } from '../../src/components/common/card';

export default function OrderDetail() {
  const [showCourier, toggleCourier] = React.useState([false, false, false]);
  const [sicepatRadioBtn, setSicepatRadioBtn] = React.useState(0);

  const onToggleCourier = React.useCallback((index) => {
    toggleCourier(
      showCourier.map((val, i) => (i === index) ? !val : val)
    );
  }, [showCourier]);

  return (
    <div className="order-edit">
      <Layout>
        <Layout.Section>
          <Link href="/order" passHref>
            <a className="breadcrumb">
              <img src="/img/right-1.png" />
              <span>List Orders</span>
            </a>
          </Link>
        </Layout.Section>
        <Layout.Section>
          <Card className="form-wrapper">
            <CardBody>
              <h1 className="heading">Edit Order</h1>
              <Form>
                <FormLayout>
                  <FormLayout.Group>
                    <TextField
                      label="First Name"
                    />
                    <TextField
                      label="Last Name"
                    />
                  </FormLayout.Group>
                </FormLayout>
                <FormLayout>
                  <TextField
                    label="Address"
                  />
                </FormLayout>
                <FormLayout>
                  <FormLayout.Group>
                    <TextField
                      label="Sub District"
                    />
                    <TextField
                      label="City"
                      disabled
                    />
                  </FormLayout.Group>
                </FormLayout>
                <FormLayout>
                  <FormLayout.Group>
                    <TextField
                      label="Province"
                      disabled
                    />
                    <TextField
                      label="ZIP Code"
                    />
                  </FormLayout.Group>
                </FormLayout>
                <FormLayout>
                  <FormLayout.Group>
                    <div className="courier-list">
                      <label>Courier List</label>
                      <Card className="courier-feature-wrapper">
                        <div className="courier-label">
                          <label>SiCepat</label>
                          <a onClick={() => onToggleCourier(0)}>
                            <img src={showCourier[0] ? '/img/plus.png' : '/img/minus.png'} />
                          </a>
                        </div>
                        <Collapsible
                          open={showCourier[0]}
                        >
                          <div className="courier-features">
                            <RadioButton
                              label={(
                                <div className="courier-feature-label">
                                  <label>Cargo</label>
                                  <div className="courier-feature-price">
                                    <label>Rp 56.000,00</label>
                                    <small>12-16 Hari</small>
                                  </div>
                                </div>
                              )}
                              checked={sicepatRadioBtn === 0}
                              name="sicepat-feature"
                              onChange={() => setSicepatRadioBtn(0)}
                            />
                            <RadioButton
                              label={(
                                <div className="courier-feature-label">
                                  <label>Cargo</label>
                                  <div className="courier-feature-price">
                                    <label>Rp 56.000,00</label>
                                    <small>12-16 Hari</small>
                                  </div>
                                </div>
                              )}
                              checked={sicepatRadioBtn === 1}
                              name="sicepat-feature"
                              onChange={() => setSicepatRadioBtn(1)}
                            />
                            <RadioButton
                              label={(
                                <div className="courier-feature-label">
                                  <label>Cargo</label>
                                  <div className="courier-feature-price">
                                    <label>Rp 56.000,00</label>
                                    <small>12-16 Hari</small>
                                  </div>
                                </div>
                              )}
                              checked={sicepatRadioBtn === 2}
                              name="sicepat-feature"
                              onChange={() => setSicepatRadioBtn(2)}
                            />
                          </div>
                        </Collapsible>
                      </Card>
                      <Card>
                        <div className="courier-feature-wrapper">
                          <div className="courier-label">
                            <label>SiCepat</label>
                            <a onClick={() => onToggleCourier(0)}>
                              <img src={showCourier[0] ? '/img/plus.png' : '/img/minus.png'} />
                            </a>
                          </div>
                          <Collapsible
                            open={showCourier[0]}
                          >
                            <div className="courier-features">
                              <RadioButton
                                label={(
                                  <div className="courier-feature-label">
                                    <label>Cargo</label>
                                    <div className="courier-feature-price">
                                      <label>Rp 56.000,00</label>
                                      <small>12-16 Hari</small>
                                    </div>
                                  </div>
                                )}
                                checked={sicepatRadioBtn === 0}
                                name="sicepat-feature"
                                onChange={() => setSicepatRadioBtn(0)}
                              />
                              <RadioButton
                                label={(
                                  <div className="courier-feature-label">
                                    <label>Cargo</label>
                                    <div className="courier-feature-price">
                                      <label>Rp 56.000,00</label>
                                      <small>12-16 Hari</small>
                                    </div>
                                  </div>
                                )}
                                checked={sicepatRadioBtn === 1}
                                name="sicepat-feature"
                                onChange={() => setSicepatRadioBtn(1)}
                              />
                              <RadioButton
                                label={(
                                  <div className="courier-feature-label">
                                    <label>Cargo</label>
                                    <div className="courier-feature-price">
                                      <label>Rp 56.000,00</label>
                                      <small>12-16 Hari</small>
                                    </div>
                                  </div>
                                )}
                                checked={sicepatRadioBtn === 2}
                                name="sicepat-feature"
                                onChange={() => setSicepatRadioBtn(2)}
                              />
                            </div>
                          </Collapsible>
                        </div>
                      </Card>
                      <Card>
                        <div className="courier-feature-wrapper">
                          <div className="courier-label">
                            <label>SiCepat</label>
                            <a onClick={() => onToggleCourier(0)}>
                              <img src={showCourier[0] ? '/img/plus.png' : '/img/minus.png'} />
                            </a>
                          </div>
                          <Collapsible
                            open={showCourier[0]}
                          >
                            <div className="courier-features">
                              <RadioButton
                                label={(
                                  <div className="courier-feature-label">
                                    <label>Cargo</label>
                                    <div className="courier-feature-price">
                                      <label>Rp 56.000,00</label>
                                      <small>12-16 Hari</small>
                                    </div>
                                  </div>
                                )}
                                checked={sicepatRadioBtn === 0}
                                name="sicepat-feature"
                                onChange={() => setSicepatRadioBtn(0)}
                              />
                              <RadioButton
                                label={(
                                  <div className="courier-feature-label">
                                    <label>Cargo</label>
                                    <div className="courier-feature-price">
                                      <label>Rp 56.000,00</label>
                                      <small>12-16 Hari</small>
                                    </div>
                                  </div>
                                )}
                                checked={sicepatRadioBtn === 1}
                                name="sicepat-feature"
                                onChange={() => setSicepatRadioBtn(1)}
                              />
                              <RadioButton
                                label={(
                                  <div className="courier-feature-label">
                                    <label>Cargo</label>
                                    <div className="courier-feature-price">
                                      <label>Rp 56.000,00</label>
                                      <small>12-16 Hari</small>
                                    </div>
                                  </div>
                                )}
                                checked={sicepatRadioBtn === 2}
                                name="sicepat-feature"
                                onChange={() => setSicepatRadioBtn(2)}
                              />
                            </div>
                          </Collapsible>
                        </div>
                      </Card>
                    </div>
                    <div className="other-controls">
                      <FormLayout>
                        <Select
                          label="Delivery Type"
                          options={[
                            { label: 'Dropoff', value: 'dropoff' },
                          ]}
                          value={'dropoff'}
                          onChange={() => { }}
                        />
                      </FormLayout>
                      <FormLayout>
                        <Select
                          label="Payment Method"
                          options={[
                            { label: 'Transfer', value: 'transfer' },
                          ]}
                          value={'transfer'}
                          onChange={() => { }}
                        />
                      </FormLayout>
                    </div>
                  </FormLayout.Group>
                </FormLayout>
                <FormLayout>
                  <div className="button-wrapper">
                    <Button primary>Save</Button>
                  </div>
                </FormLayout>
              </Form>
            </CardBody>
          </Card>
        </Layout.Section>
      </Layout>
    </div>
  );
}
