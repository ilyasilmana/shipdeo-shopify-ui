import conclass from '../../utils/conclass';

const Card = (props) => (
  <div className={conclass('card', props.className)}>
    {props.children}
    <style jsx global>
      {`
        .card {
          box-shadow: 0px 4px 14px rgba(121, 121, 121, 0.15);
          background: #FCFCFC;
          border-radius: 10px;
        }
      `}
    </style>
  </div>
);

const CardBody = (props) => (
  <div className={conclass('card-body', props.className)}>
    {props.children}
    <style jsx global>
      {`
        .card-body {
          padding: 32px;
        }
      `}
    </style>
  </div>
);

export {
  Card,
  CardBody,
}
