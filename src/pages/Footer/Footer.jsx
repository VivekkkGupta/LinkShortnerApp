import { Github, Twitter, Linkedin } from "lucide-react"; // Import icons

function Footer() {
  return (
    <div className="w-full bg-gray-900 text-white py-4 flex flex-col sm:flex-row items-center justify-between px-10">
      <div className="flex gap-4 mb-2 sm:mb-0">
        <a href="https://github.com/VivekkkGupta" target="_blank" rel="noopener noreferrer">
          <Github className="text-white hover:text-gray-400" />
        </a>
        <a href="https://x.com/vivekkkgupta" target="_blank" rel="noopener noreferrer">
          <Twitter className="text-white hover:text-gray-400" />
        </a>
        <a href="https://www.linkedin.com/in/vivekguptaaa/" target="_blank" rel="noopener noreferrer">
          <Linkedin className="text-white hover:text-gray-400" />
        </a>
      </div>
      <div className="text-center">
        &copy; {new Date().getFullYear()} Shortyourl
      </div>
      <div className="text-center">
        Made with ❤️ by Vivek
      </div>
    </div>
  );
}

export default Footer;