import React from "react";
import { Outlet } from "react-router-dom";

function PageLayout() {
  return (
    <div>
      <main>
        {/* Header */}
        <Outlet />
      </main>
      {/* Footer */}
    </div>
  );
}

export default PageLayout;
