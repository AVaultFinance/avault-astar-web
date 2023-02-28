import BigNumber from 'bignumber.js';
import { useEffect, useMemo, useState } from 'react';
import { useVaultAllTotal } from 'state/vault/hooks';
import styled from 'styled-components';

const Data = () => {
  const [data, setData] = useState({
    counter: '',
    users: '',
    volume: '',
  });
  const allTotal = useVaultAllTotal();

  const _all = useMemo(() => {
    if (allTotal && data.volume) {
      return Number(new BigNumber(allTotal).plus(data.volume).toFixed(0)).toLocaleString();
    }
    return '';
  }, [allTotal, data.volume]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://www.avault.network/api/v0/statistics');
        const responseData = await response.json();
        const { data } = responseData || {};
        const { counter, users, volume } = data || {};
        setData({
          counter,
          users,
          volume,
        });
      } catch (error) {
        console.error('Unable to fetch data:', error);
      }
    };

    fetchData();
  }, [setData]);

  return (
    <DataStyled>
      <div className="fl">
        <h2>
          Platform
          <br /> real-time
          <br /> data
        </h2>
        <p>
          <i></i>Real-time updates
        </p>
      </div>
      <div className="fr">
        <ul>
          <li>
            <div className="inner">
              <h5>{_all}</h5>
              <p>Total Volume</p>
            </div>
          </li>
          <li>
            <div className="inner">
              <h5>{Number(data.counter).toLocaleString()}</h5>
              <p>Total Transaction</p>
            </div>
          </li>
          <li>
            <div className="inner">
              <h5>{Number(data.users).toLocaleString()}</h5>
              <p>Total Users</p>
            </div>
          </li>
        </ul>
      </div>
    </DataStyled>
  );
};
const DataStyled = styled.div`
  max-width: 1208px;
  margin: 0 auto;
  padding: 0 20px;
  ${({ theme }) => theme.mediaQueries.lg} {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    padding: 0;
  }
  .fl {
    h2 {
      font-size: 60px;
      color: #ffffff;
      font-weight: 800;
      line-height: 64px;
      ${({ theme }) => theme.mediaQueries.lg} {
        font-size: 80px;
        line-height: 84px;
      }
    }
    p {
      font-weight: 600;
      font-size: 14px;
      color: #6a698e;
      line-height: 18px;
      margin-top: 10px;
      i {
        display: inline-block;
        width: 6px;
        height: 6px;
        background: #bf6aeb;
        border-radius: 50%;
        margin-right: 7px;
      }
    }
  }
  ul {
    padding: 80px 0;
    ${({ theme }) => theme.mediaQueries.lg} {
      padding: 160px 0;
    }
    li {
      width: 100%;
      background-image: linear-gradient(180deg, #d361fe 0%, #161527 100%);
      padding: 2px 2px 0;
      border-radius: 20px;
      margin-top: 40px;
      ${({ theme }) => theme.mediaQueries.lg} {
        width: 490px;
        height: 204px;
      }
      .inner {
        padding: 30px;
        ${({ theme }) => theme.mediaQueries.sm} {
          padding: 40px 30px;
        }
        ${({ theme }) => theme.mediaQueries.lg} {
          padding: 50px 36px 0;
        }
        border-radius: 20px;
        padding: 50px 36px 0;
        height: 100%;
        background-image: linear-gradient(180deg, #3a2658 0%, #161527 100%);
        h5 {
          font-weight: 800;
          font-size: 60px;
          line-height: 64px;
          background: linear-gradient(90deg, #d562ff 0%, #5c1fab 100%);
          -webkit-background-clip: text;
          color: transparent;
          ${({ theme }) => theme.mediaQueries.lg} {
            font-size: 80px;
            line-height: 84px;
          }
        }
        p {
          color: #6a698e;
          line-height: 28px;
        }
      }
      &:nth-child(1) {
        margin-top: 0;
      }
      &:nth-child(2) {
        background-image: linear-gradient(180deg, #37b59a 0%, #161527 100%);
        .inner {
          background-image: linear-gradient(180deg, #3a2658 0%, #161527 100%);
          h5 {
            background: linear-gradient(90deg, #40c7a7 0%, #0e655e 100%);
            -webkit-background-clip: text;
            color: transparent;
          }
        }
      }
      &:nth-child(3) {
        background-image: linear-gradient(180deg, #4f8fdd 0%, #161527 100%);
        .inner {
          background-image: linear-gradient(180deg, #3a2658 0%, #161527 100%);
          h5 {
            background: linear-gradient(90deg, #599ef0 0%, #1f427f 100%);
            -webkit-background-clip: text;
            color: transparent;
          }
        }
      }

      // &:nth-child(3) {
      //   background-image: linear-gradient(180deg, #4f8fdd 0%, #161527 100%);
      //   .inner {
      //     background-image: linear-gradient(180deg, #3a2658 0%, #161527 100%);
      //     h5 {
      //       background: linear-gradient(90deg, #599ef0 0%, #1f427f 100%);
      //       -webkit-background-clip: text;
      //       color: transparent;
      //     }
      //   }
      // }
    }
  }
`;
export default Data;
