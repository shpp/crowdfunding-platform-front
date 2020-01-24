import theme from '../theme/colors';


const SocialIcon = ({ children, link }) => {
  return (
    <a href={link}>
      <div>
        {children}
      </div>
      <style jsx>
        {
          `
          div {
            width: 50px;
            height: 50px;
            border-radius: 15%;
            display: flex;
            justify-content: center;
            align-items: center;        
          }
          a {
            cursor: pointer;
          }
          div:hover {
            border: 1px solid ${theme.green};
          }
          `
        }
      </style>
    </a>
  );
};

export default SocialIcon;
