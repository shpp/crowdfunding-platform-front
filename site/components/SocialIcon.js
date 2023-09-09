const SocialIcon = ({ children, link }) => {
  return (
    <a href={link}>
      <i>{children}</i>
      <style>
        {`
          i {
            width: 20px;
            height: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          a {
            cursor: pointer;
            padding: 5px;
          }
          a:hover {
            background-color: rgba(0, 0, 0, 0.05);
          }
        `}
      </style>
    </a>
  );
};

export default SocialIcon;
