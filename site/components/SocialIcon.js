const SocialIcon = ({ children, link }) => {
  return (
    <a href={link} className="social-icon">
      <i>{children}</i>
      <style>
        {`
          .social-icon i {
            width: 20px;
            height: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          a.social-icon {
            cursor: pointer;
            padding: 5px;
          }
          a.social-icon:hover {
            background-color: rgba(0, 0, 0, 0.05);
          }
        `}
      </style>
    </a>
  );
};

export default SocialIcon;
