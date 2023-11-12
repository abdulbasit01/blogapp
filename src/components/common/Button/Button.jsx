const Button = ({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "bg-white dark-bg:gray-500",
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`inline-block px-6 py-2 duration-200 rounded-full ${bgColor} ${className} ${textColor}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
