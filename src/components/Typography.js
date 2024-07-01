import React from "react";

const tags = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  body: "p",
  "body-small": "p",
  small: "span",
};

const sizes = {
  h1: "tablet:text-5xl font-bold text-4xl",
  h2: "tablet:text-4xl text-3xl",
  h3: "tablet:text-3xl font-normal text-2xl leading-[1.51613rem]",
  h4: "tablet:text-2xl text-xl",
  h5: "tablet:text-xl font-bold text-lg",
  body: "tablet:text-lg text-md",
  "body-small": "text-md text-sm",
  small: "tablet:text-sm text-xs",
};

export const Typography = ({ variant, children, className, as }) => {
  const sizeClasses = sizes[variant];
  const Tag = as || tags[variant];

  return <Tag className={`${sizeClasses} ${className}`}>{children}</Tag>;
};

Typography.defaultProps = {
  variant: "body",
  children: null,
  className: "",
  as: null,
};
