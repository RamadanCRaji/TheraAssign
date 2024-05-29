import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

//Menu_content
export default function SideBarItem(props) {
  const { icon, text, active, action } = props;

  return (
    <li>
      {icon}
      <span>{text}</span>
    </li>
  );
}

// i am using router.push becuase it does not cause a page reload everytime and i do not have to make a server request everytime
