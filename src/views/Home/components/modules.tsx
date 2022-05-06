import styled from 'styled-components';

const modulesArr = [
  {
    logo: './images/home/icon_vault.webp',
    title: 'Vault',
    content:
      'Providing the aLP/aToken to the users by deposited their LP or token from other dapp. Then, the vault will automation to continually reinvest deposited funds',
  },
  {
    logo: './images/home/icon_farm.webp',
    title: 'Farm',
    content: 'Providing higher revenue in $AVAT to the users by staked their aLP/aToken that received from vault',
  },
  {
    logo: './images/home/icon_zap.webp',
    title: 'Vault',
    content:
      'Allows you to directly switch from single asset to an LP token with just a click of a button without having to go other dex to switch out different asset',
  },
  {
    logo: './images/home/icon_governance.webp',
    title: 'Governance',
    content:
      'You can stake your $AVAT to get veAVAT. The number of veAVAT you get will depend on how long you choose to lock. Longer will be more. veAVAT will represent your share in the governance reward pool and your voting rights on upcoming governance features.',
  },
];
const HomeModules = () => {
  return (
    <HomeModulesStyled>
      <HomeModulesStyledInner>
        <h2>Main Modules</h2>
        <ul>
          {modulesArr.map((v) => {
            return (
              <li key={v.logo} className="animate animate__animated" data-animate="animate__fadeInUp">
                <img src={v.logo} alt={v.title} />
                <div>
                  <h3>{v.title}</h3>
                  <p>{v.content}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </HomeModulesStyledInner>
    </HomeModulesStyled>
  );
};
const HomeModulesStyledInner = styled.div`
  max-width: 1208px;
  background-image: url('/images/stake/bg_element.svg');
  background-repeat: no-repeat;
  background-size: 420px;
  background-position: right 120px;
  margin: 0 auto;
`;
const HomeModulesStyled = styled.div`
  background-image: url('/images/home/modules_bg.webp');
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  // .bgI {
  //   width: 420px;
  //   height: 150px;
  //   position: absolute;
  //   top: 126px;
  //   right: 0;
  // }
  h2 {
    font-size: 80px;
    text-align: center;
    padding: 200px 0 120px;
    position: relative;
    z-index: 2;
  }
  ul {
    // text-align: center;
    clear: both;
    overflow: hidden;
    padding-bottom: 200px;
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #030222;
      border: 1px solid #2e2d5b;
      border-radius: 20px;
      width: 46%;
      margin-top: 40px;
      height: 240px;
      padding: 0 50px 0 60px;
      transition: all 0.2s ease;
      background-image: radial-gradient(circle at 50% 0%, #040222 0%, #040222 100%);
      background-position: 0 -120px;
      background-repeat: no-repeat;
      &:nth-child(1),
      &:nth-child(3) {
        float: left;
      }
      &:nth-child(2),
      &:nth-child(4) {
        float: right;
      }
      &:hover {
        background-image: radial-gradient(circle at 50% 0%, #3e255b 0%, #050222 100%);
        box-shadow: 0 10px 20px 5px rgb(0 0 0 / 3%);
        background-position: 0 0;
        border-color: #050222;
        h3,
        p {
          color: #fff;
        }
      }
      img {
        width: 96px;
      }
      div {
        margin-left: 50px;
      }
      h3 {
        transition: all 0.2s ease;
        font-size: 30px;
        color: #6a6991;
        margin-bottom: 20px;
      }
      p {
        transition: all 0.2s ease;
        font-weight: 600;
        font-size: 12px;
        color: #6a6991;
        line-height: 20px;
      }
    }
  }
`;
export default HomeModules;
