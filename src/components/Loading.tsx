import styled from "@emotion/styled";

function Loading() {
  return (
    <StyledLoading>
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </StyledLoading>
  );
}
const StyledLoading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;

  & .dot {
    width: 10px;
    height: 10px;
    background-color: #da8888;

    border-radius: 50%;
    animation: loading 0.5s 0s ease-in-out infinite;

    &:nth-of-type(2) {
      animation-delay: 0.1s;
    }

    &:nth-of-type(3) {
      animation-delay: 0.2s;
    }
  }

  @keyframes loading {
    0%,
    80% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
      opacity: 0.6;
    }
  }
`;

export default Loading;
