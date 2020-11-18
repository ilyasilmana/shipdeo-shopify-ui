import React, { useEffect, useState, useCallback } from "react";
import {
  Button,
  Card,
  ChoiceList,
  DataTable,
  Filters,
  Layout,
  Popover,
  Pagination,
  ResourceItem,
  ResourceList,
  Stack,
  SkeletonBodyText,
  Spinner,
  TextStyle,
} from '@shopify/polaris';
import {
  CancelSmallMinor,
  LabelPrinterMajorMonotone,
  SearchMajorMonotone,
  SortMinor,
  TickMinor,
} from '@shopify/polaris-icons';

import Dropdown from "../../src/components/common/dropdown";
import Filter from '../../src/components/main/order/filter-section';
import { ButtonPrint, ButtonProcess, ButtonCancel } from '../../src/components/main/order/action-button';
import Status from '../../src/components/main/order/status-icon';
import { swalSuccess, swal } from '../../src/components/common/swal';
import { toRupiah } from '../../src/utils/currency-format';

export default function OrderComponent() {
  const dummyRows = [
    ['#1001', '2020-10-20', 'PO-08123456789', 'RO-08123456789', 'entry', '200.000.000,00', 'COD'],
    ['#1002', '2020-11-20', 'PO-08123456789', 'RO-08123456789', 'cancelled', '200.000.000,00', 'Transfer'],
    ['#1003', '2020-12-20', 'PO-08123456789', 'RO-08123456789', 'on-progress', '200.000.000,00', 'COD'],
  ];

  const [showSortBy, toggleSortBy] = useState(false);

  const [showSkeleton, toggleSkeleton] = useState(true);

  const [selectedItems, setSelectedItems] = useState([]);
  const [search, setSearch] = useState('');
  const [sortedRows, setSortedRows] = useState(null);
  const [showRowsDropdown, onShowRowsDropdown] = useState(false);
  const [rows, setRows] = useState(dummyRows);

  const [filterTake, setFilterTake] = useState(30);
  const [filterSkip, setFilterSkip] = useState(0);
  const totalItems = 750;

  const handleSort = useCallback(
    (index, direction) => setSortedRows(sortCurrency(dummyRows, index, direction)),
    [dummyRows]
  );

  const sortCurrency = (rows, index, direction) => {
    return [...rows].sort((rowA, rowB) => {
      const amountA = parseFloat(rowA[index].substring(1));
      const amountB = parseFloat(rowB[index].substring(1));

      return direction === 'descending' ? amountB - amountA : amountA - amountB;
    });
  }

  useEffect(() => {
    let row = [...rows];
    row = row.map((value, index) => {
      return [
        value[0],
        value[1],
        value[2],
        value[3],
        <Status type={value[4]} />,
        value[6],
        value[5],
        (
          <div className="order-actions">
            <span title="Print Shipping Label">
              <Button icon={LabelPrinterMajorMonotone} />
            </span>
            <span title="Confirm Order">
              <Button primary icon={TickMinor} />
            </span>
            <span title="Cancel Order">
              <Button destructive icon={CancelSmallMinor} />
            </span>
            <style jsx>
              {`
                .order-actions {
                  display: flex;
                  justify-content: space-evenly;
                }
                .order-actions > :nth-child(2) {
                  margin: 0 6px;
                }
              `}
            </style>
          </div>
        )
      ];
    });

    setRows(row);

  }, []);

  useEffect(() => {
    renderResourceHeader();
  });

  const toggleRowsDropdown = useCallback(() => {
    onShowRowsDropdown((active) => !active);
  }, []);

  const onProcessOrder = (id) => {
    swal.fire({
      width: '400px',
      position: 'top',
      title:
        <div>
          <div className="shipdeo-swal-title">Apakah anda yakin akan melakukan Confirm Order?</div>
          <select className="confirm-order-delivery-type" onChange={(e) => console.log(e.target.value)}>
            <option value="pickup">Pickup</option>
            <option value="dropoff">Dropoff</option>
          </select>
        </div>
      ,
      showCloseButton: true,
      showCancelButton: true,
      closeButtonHtml: <img src="/img/close.png" />,
      confirmButtonText: 'Ya',
      cancelButtonText: 'Tidak',
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        return true;
      },
      allowOutsideClick: () => !swal.isLoading()
    })
      .then((res) => {
        if (res.isConfirmed) {
          swalSuccess({ title: 'Order telah dikonfirmasi!' });
        }
      });
  }

  const renderItem = (item) => {
    const { id, url, name, location } = item;
    return (
      <ResourceItem
        id={id}
        url={url}
        accessibilityLabel={`View details for ${name}`}
        shortcutActions={[
          { content: 'Print Shipping Label', onClick: () => { console.log('A') } },
          { content: 'Confirm Order', onClick: () => { console.log('B') } },
          { content: 'Cancel Order', onClick: () => { console.log('C') } },
        ]}
        persistActions
      >
        <h3>
          <TextStyle variation="strong">{name}</TextStyle>
        </h3>
        <div>{location}</div>
      </ResourceItem>
    );
  }

  const [sortVal, setSortVal] = useState(['1']);

  const renderFilter = () => {
    return (
      <Filters
        queryValue={search}
        filters={[]}
        appliedFilters={[]}
        onQueryChange={() => { }}
        onQueryClear={() => { }}
        onClearAll={() => { }}
      >
        <div style={{ paddingLeft: '8px' }}>
          <Popover
            active={showSortBy}
            activator={(
              <Button icon={SortMinor} onClick={() => { toggleSortBy(!showSortBy) }}>Sort By</Button>
            )}
            fluidContent
            preferredAlignment="right"
            onClose={() => { }}
          >
            <div style={{ padding: '16px', maxHeight: '250px' }}>
              <div style={{ marginBottom: '8px' }}>
                <TextStyle variation="subdued">Sort By</TextStyle>
              </div>
              <ChoiceList
                choices={[
                  { label: 'Date (Newest to Oldest)', value: '1' },
                  { label: 'Date (Oldest to Newest)', value: '2' },
                ]}
                selected={sortVal}
                onChange={(value) => {
                  setSortVal(value);
                  console.log(value);
                }}
              />
            </div>
          </Popover>
        </div>
      </Filters>
    )
  }

  const renderResourceHeader = () => {
    // Inject custom header to ResourceList Component
    const headerComponent = document.getElementsByClassName('Polaris-ResourceList__HeaderOuterWrapper');
    const tableHeading = document.getElementById('table-heading');

    // If Polaris Header Component exists,
    // inject custom heading to that component.
    if (headerComponent.length > 0) {
      // 
      // Remove existing "table-heading" on re-render
      tableHeading && tableHeading.remove();

      headerComponent[0].innerHTML += 
      '<div id="table-heading">'
        + '<div>Order</div>'
        + '<div>Date</div>'
        + '<div>Booking Code</div>'
        + '<div>Airwaybill</div>'
        + '<div>Payment Status</div>'
        + '<div>Payment Method</div>'
        + '<div>Status</div>'
        + '<div>Total</div>'
      + '</div>';
    }
  }

  const renderDataTable = () => {
    return (
      <React.Fragment>
        <ResourceList
          filterControl={renderFilter()}
          idForItem={(item) => (`${item.order_id}/${item.order_id_shipdeo}`)}
          items={dummyData}
          promotedBulkActions={[
            {
              content: 'Print Shipping Label',
              onAction: () => console.log(selectedItems)
            },
          ]}
          onSelectionChange={(items) => {
            setSelectedItems(items);
            console.log(items)
          }}
          selectable
          selectedItems={selectedItems}
          resourceName={{ singular: 'order', plural: 'orders' }}
          renderItem={(item) => {
            return (
              <ResourceItem
                key={item._id}
                id={(`${item.order_id}/${item.order_id_shipdeo}`)}
                url={'#'}
                shortcutActions={[
                  {
                    primary: true,
                    icon: TickMinor,
                    content: 'Process',
                    onClick: () => this.onProcessOrder(item.order_id, item.order_id_shipdeo)
                  },
                  {
                    destructive: true,
                    icon: CancelSmallMinor,
                    content: 'Cancel',
                    onClick: () => this.onCancelOrder(item.order_id)
                  },
                ]}
              >
                <div className="resource-item">
                  <div>
                    <TextStyle variation="strong">{item.name}</TextStyle>
                  </div>
                  <div>
                    <TextStyle>{new Date(item.created_at).toLocaleString()}</TextStyle>
                  </div>
                  <div>
                    <TextStyle>{item.booking_code}</TextStyle>
                  </div>
                  <div>
                    <TextStyle>{item.courier.toUpperCase()}/{item.service}</TextStyle>
                    <br/>
                    <TextStyle>{item.airwaybill}</TextStyle>
                  </div>
                  <div>
                    <TextStyle>{item.financial_status}</TextStyle>
                  </div>
                  <div>
                    <TextStyle>{item.is_cod ? 'COD' : 'Transfer'}</TextStyle>
                  </div>
                  <div>
                    <TextStyle>{getShipdeoStatus(Math.round(Math.random() * 6))}</TextStyle>
                    {/* <TextStyle>{getShipdeoStatus(item.status)}</TextStyle> */}
                  </div>
                  <div>
                    <TextStyle>{toRupiah(item.total_price)}</TextStyle>
                  </div>
                </div>
              </ResourceItem>
            )
          }}
        />
        <Card.Section>
          <Stack alignment="center">
            <Stack.Item fill></Stack.Item>
            <Stack.Item>
              <Dropdown
                show={showRowsDropdown}
                onHide={() => { onShowRowsDropdown(false) }}
                onSelect={() => { }}
                items={[
                  { label: '10', value: 10 },
                  { label: '25', value: 25 },
                  { label: '50', value: 50 }
                ]}
                fullWidth
              >
                <div>
                  <span>Rows: </span>
                  <Button
                    plain
                    disclosure
                    onClick={() => { onShowRowsDropdown(!showRowsDropdown) }}
                  >10</Button>
                </div>
              </Dropdown>
            </Stack.Item>
            <Stack.Item>
              <Pagination
                hasPrevious
                onPrevious={() => { }}
                hasNext
                onNext={() => { }}
              />
            </Stack.Item>
          </Stack>
        </Card.Section>
      </React.Fragment>
    );
  }

  const renderLoader = () => {
    const skeletonData = [
      <SkeletonBodyText lines={1} />,
      <SkeletonBodyText lines={1} />,
      <SkeletonBodyText lines={1} />,
      <SkeletonBodyText lines={1} />,
      <SkeletonBodyText lines={1} />,
      <SkeletonBodyText lines={1} />,
      <SkeletonBodyText lines={1} />,
      <SkeletonBodyText lines={1} />,
    ];

    return (
      <DataTable
        columnContentTypes={['text', 'text', 'text', 'text', 'text', 'text', 'text', 'text']}
        headings={skeletonData}
        rows={[
          skeletonData,
          skeletonData,
          skeletonData
        ]}
      />
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <Layout>
        <Layout.Section>
          <Button onClick={() => toggleSkeleton(!showSkeleton)}>Skeleton</Button>
        </Layout.Section>
        <Layout.Section>
          <Card>
            {showSkeleton
              ? renderDataTable()
              : (
                <div style={{ width: '100%', display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                  <Spinner accessibilityLabel="Loading Order List..." size="large" color="teal" />
                </div>
              )
            }
          </Card>
        </Layout.Section>
      </Layout>
    </div>
  );
}

const getShipdeoStatus = (status) => {
  switch (status) {
    case 0: return 'UNPROCESSED';
    case 1: return 'PROCESSING';
    case 2: return 'READY TO SHIP';
    case 3: return 'SHIPPED';
    case 4: return 'DELIVERED';
    case 5: return 'CANCEL';
    case 6: return 'RETURN';
  }
}

const dummyData = [{ "_id": "5f6dac991cdb9f0012e02c96", "order_id": "2755554050208", "order_id_shipdeo": "5f6dac98fcf0550011a3783d", "shop": "shipdeo-dev.myshopify.com", "name": "#1166", "created_at": "2020-09-25T04:38:44-04:00", "updated_at": "2020-09-25T04:38:45-04:00", "financial_status": "pending", "fulfillment_status": "", "item": "", "total_price": "234000.00", "courier": "sap", "service": "UDRREG", "order_number": "#1166", "booking_code": "CLSA-1601023126749", "owner": "shipdeo-plugin", "is_cod": false, "airwaybill": "CS01114000267", "__v": 0 }, { "_id": "5f6da90e1cdb9f0012e02c94", "order_id": "2755536748704", "order_id_shipdeo": "5f6da90efcf0550011a37810", "shop": "shipdeo-dev.myshopify.com", "name": "#1165", "created_at": "2020-09-25T04:23:35-04:00", "updated_at": "2020-09-25T04:23:35-04:00", "financial_status": "pending", "fulfillment_status": "", "item": "", "total_price": "234000.00", "courier": "ninja", "service": "STANDARD", "order_number": "#1165", "booking_code": "CLNJ-1601022220739", "owner": "shipdeo-plugin", "is_cod": false, "__v": 0 }, { "_id": "5f6d9f821cdb9f0012e02c92", "order_id": "2755491168416", "order_id_shipdeo": "5f6d9f8247addb0011492e79", "shop": "shipdeo-dev.myshopify.com", "name": "#1164", "created_at": "2020-09-25T03:42:55-04:00", "updated_at": "2020-09-25T03:42:55-04:00", "financial_status": "pending", "fulfillment_status": "", "item": "", "total_price": "234000.00", "courier": "sap", "service": "UDRREG", "order_number": "#1164", "booking_code": "CLSA-1601019778187", "owner": "shipdeo-plugin", "is_cod": true, "airwaybill": "CS01114000266", "__v": 0 }, { "_id": "5f6d623e9b86350012e694c4", "order_id": "2755118891168", "order_id_shipdeo": "5f6d623efcf0550011a36879", "shop": "shipdeo-dev.myshopify.com", "name": "#1162", "created_at": "2020-09-24T23:21:32-04:00", "updated_at": "2020-09-24T23:21:32-04:00", "financial_status": "pending", "fulfillment_status": "", "item": "", "total_price": "234000.00", "courier": "anteraja", "service": "SD", "order_number": "#1162", "booking_code": "CLAJ-1601004094084", "owner": "shipdeo-plugin", "is_cod": false, "__v": 0 }, { "_id": "5f6c5b6ff54cedc39d5aa80a", "order_id": "2751249186976", "order_id_shipdeo": "5f6c5b6fe1e5420012aa4ffd", "shop": "shipdeo-dev.myshopify.com", "name": "#1106", "created_at": "2020-09-24T04:40:13-04:00", "updated_at": "2020-09-24T04:40:13-04:00", "financial_status": "pending", "fulfillment_status": "", "item": "", "total_price": "45000.00", "courier": "anteraja", "service": "SD", "order_number": "#1106", "booking_code": "CLAJ-1600936814968", "owner": "shipdeo-plugin", "is_cod": true, "__v": 0 }, { "_id": "5f6c21ce3a347296f02fe120", "order_id": "2750847254688", "order_id_shipdeo": "5f6c21cee1e5420012aa47e1", "shop": "shipdeo-dev.myshopify.com", "name": "#1076", "created_at": "2020-09-24T00:34:19-04:00", "updated_at": "2020-09-24T00:34:19-04:00", "financial_status": "pending", "fulfillment_status": "", "item": "", "total_price": "45000.00", "courier": "anteraja", "service": "SD", "order_number": "#1076", "booking_code": "CLAJ-1600922061747", "owner": "shipdeo-plugin", "is_cod": true, "__v": 0 }, { "_id": "5f6c217a4cf795967452cde2", "order_id": "2750845386912", "order_id_shipdeo": "5f6c21792915910011807459", "shop": "shipdeo-dev.myshopify.com", "name": "#1075", "created_at": "2020-09-24T00:32:54-04:00", "updated_at": "2020-09-24T00:32:55-04:00", "financial_status": "pending", "fulfillment_status": "", "item": "", "total_price": "45000.00", "courier": "anteraja", "service": "SD", "order_number": "#1075", "booking_code": "CLAJ-1600921977353", "owner": "shipdeo-plugin", "__v": 0 }, { "_id": "5f6c20dbd978d1956396a1d0", "order_id": "2750841847968", "order_id_shipdeo": "5f6c20da291591001180744d", "shop": "shipdeo-dev.myshopify.com", "name": "#1074", "created_at": "2020-09-24T00:30:13-04:00", "updated_at": "2020-09-24T00:30:13-04:00", "financial_status": "pending", "fulfillment_status": "", "item": "", "total_price": "45000.00", "courier": "anteraja", "service": "SD", "order_number": "#1074", "booking_code": "CLAJ-1600921818376", "owner": "shipdeo-plugin", "__v": 0 }, { "_id": "5f6c2088226baf9508b74602", "order_id": "2750839914656", "order_id_shipdeo": "5f6c20882915910011807440", "shop": "shipdeo-dev.myshopify.com", "name": "#1073", "created_at": "2020-09-24T00:28:51-04:00", "updated_at": "2020-09-24T00:28:51-04:00", "financial_status": "pending", "fulfillment_status": "", "item": "", "total_price": "45000.00", "courier": "anteraja", "service": "SD", "order_number": "#1073", "booking_code": "CLAJ-1600921733910", "owner": "shipdeo-plugin", "__v": 0 }, { "_id": "5f6c1be66854cd8dc5f5c29d", "order_id": "2750810390688", "order_id_shipdeo": "5f6c1be629159100118073ed", "shop": "shipdeo-dev.myshopify.com", "name": "#1071", "created_at": "2020-09-24T00:09:07-04:00", "updated_at": "2020-09-24T00:09:07-04:00", "financial_status": "pending", "fulfillment_status": "", "item": "", "total_price": "45000.00", "courier": "anteraja", "service": "SD", "order_number": "#1071", "booking_code": "CLAJ-1600920549981", "owner": "shipdeo-plugin", "__v": 0 }]
