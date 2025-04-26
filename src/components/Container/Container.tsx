import styled from './Container.module.css';

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className={styled.container}>{children}</div>;
};

export default Container;
