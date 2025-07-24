"use client"
// components/ui/Skeleton.tsx
import styled from "styled-components";

const SkeletonWrapper = styled.div`
  padding: 24px;
  background-color: #f6f7f8;
  border-radius: 8px;
`;

const Line = styled.div<{ width?: string; height?: string }>`
  background: linear-gradient(90deg, #eee 25%, #ddd 50%, #eee 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
  height: ${({ height }) => height || "16px"};
  width: ${({ width }) => width || "100%"};
  margin-bottom: 12px;

  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`;

export const Skeleton = () => (
    <SkeletonWrapper>
        <Line height="24px" width="40%" /> {/* タイトル用 */}
        <Line width="80%" />
        <Line width="60%" />
        <Line width="90%" />
        <Line width="50%" />
    </SkeletonWrapper>
);
