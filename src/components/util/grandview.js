export default function GrandView({ children }) {
    if (!visible) return null;
  
    return (
      <div>
        <div>
          {children}
        </div>
      </div>
    );
  }