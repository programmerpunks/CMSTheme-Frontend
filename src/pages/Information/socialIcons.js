import { AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai';
import { FaYoutube } from 'react-icons/fa';
import { GrFacebookOption } from 'react-icons/gr';

const Icon = ({ children }) => {
  return (
    <div
      className='d-flex justify-content-center 
      align-items-center w-20 p-2 bg-secondary rounded-circle m-2'
    >
      {children}
    </div>
  );
};

export const SocialIcons = ({ social, colors, setSocialLink }) => {
  const deleteLink = (key) => {
    setSocialLink((social) => social.filter((item) => item.platform !== key));
  };

  let socialicons = [];
  social.map((item) => {
    if (item.platform === 'instagram')
      socialicons.push(
        <Icon key={item.platform}>
          <AiOutlineInstagram
            size={20}
            color={colors.primary[200]}
            onClick={() => deleteLink(item.platform)}
          />
        </Icon>
      );
    else if (item.platform === 'facebook')
      socialicons.push(
        <Icon key={item.platform}>
          <GrFacebookOption
            size={20}
            color={colors.primary[200]}
            onClick={() => deleteLink(item.platform)}
          />
        </Icon>
      );
    else if (item.platform === 'twitter')
      socialicons.push(
        <Icon key={item.platform}>
          <AiOutlineTwitter
            size={20}
            color={colors.primary[200]}
            onClick={() => deleteLink(item.platform)}
          />
        </Icon>
      );
    else
      socialicons.push(
        <Icon key={item.platform}>
          <FaYoutube
            size={20}
            color={colors.primary[200]}
            onClick={() => deleteLink(item.platform)}
          />
        </Icon>
      );
    return socialicons;
  });
  return socialicons;
};
