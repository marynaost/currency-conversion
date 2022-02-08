import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as API from 'services/api';
import s from './Convertasion.module.scss';

export default function Convertasion() {
  const [input, setInput] = useState('');
  const [quantity, setQuantity] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [equal, setEqual] = useState('');

  const [output, setOutput] = useState('');

  useEffect(() => {
    if (!from && !to && !quantity) {
      return;
    }
    API.fetchCurrencyConvension(from, to, quantity)
      .then(data => {
        setOutput(data.rates[to].rate_for_amount);
      })
      .catch(err => {
        toast.error(err);
      });
  }, [from, quantity, to]);

  function inputValue(e) {
    if (e.target.value === '') {
      setQuantity('');
      setFrom('');
      setTo('');
      setEqual('');
      return;
    }
    setInput(e.target.value.toUpperCase());
  }

  const handleOnSubmit = e => {
    e.preventDefault();
    const arrayOfString = input.split(' ');
    const quantity = arrayOfString[0];
    const from = arrayOfString[1];
    const to = arrayOfString[3];
    if (!quantity || !from || !to) {
      toast.error('Please enter all data');
      return;
    }
    setQuantity(quantity);
    setFrom(from);
    setTo(to);
    setEqual('=');
  };

  const convertasion = () => {
    if (output) {
      const coin = output.split('.')[1];
      const gain =
        Number(coin[0]) === 0 && Number(coin[1]) === 0
          ? output
          : Number(output).toFixed(2);
      return gain;
    }
  };
  return (
    <div className={s.convertasion}>
      <h1>Currency converter</h1>
      <div className={s.container}>
        <div>
          <h3>Amount</h3>
          <form onSubmit={handleOnSubmit}>
            <input
              className={s.input}
              type="text"
              placeholder="Enter the amount"
              onChange={e => inputValue(e)}
            />
            <button type="submit" className={s.button}>
              Сonvert
            </button>
          </form>
        </div>
      </div>
      <div className={s.amount}>
        <h2>Converted Amount:</h2>
        <p>
          {quantity} {from} {equal} {convertasion()} {to}
        </p>
      </div>
    </div>
  );
}
