import React, { useState } from "react";
import InstructorNavbar from "../../components/instructor/InstructorNavbar";
import InstructorSidebar from "../../components/instructor/InstructorSidebar";
import Footer from "../../components/Footer";
import "./Settings.css";

export default function Settings() {
  const [branding, setBranding] = useState({
    name: "LMS Sri Lanka",
    logoUrl: ""
  });
  const [gateway, setGateway] = useState({
    merchantId: "MERCH_1238479",
    publicKey: "pk_live_51293x...",
    privateKey: "••••••••••••••••••••••••"
  });

  const handleSaveBranding = (e) => {
    e.preventDefault();
    alert("Branding settings saved successfully!");
  };

  const handleSaveGateway = (e) => {
    e.preventDefault();
    alert("Payment gateway configurations updated successfully!");
  };

  return (
    <div className="admin-settings-page">
      <InstructorNavbar activeLink="Settings" />
      <div className="admin-body">
        <InstructorSidebar activeMenu="Admin Panel" />
        <main className="admin-main settings-main">
          <div className="settings-header">
            <h1>System Settings</h1>
            <p>Configure portal branding, logo assets, and payment gateway connections.</p>
          </div>

          <div className="settings-grid">
            {/* Branding Settings */}
            <div className="settings-card">
              <h2>Branding & Identity</h2>
              <form onSubmit={handleSaveBranding}>
                <div className="settings-form-group">
                  <label>Portal Name</label>
                  <input
                    type="text"
                    value={branding.name}
                    onChange={e => setBranding({ ...branding, name: e.target.value })}
                  />
                </div>
                <div className="settings-form-group">
                  <label>Logo Asset URL</label>
                  <input
                    type="text"
                    placeholder="https://example.com/logo.png"
                    value={branding.logoUrl}
                    onChange={e => setBranding({ ...branding, logoUrl: e.target.value })}
                  />
                </div>
                <button type="submit" className="save-btn">Save Identity</button>
              </form>
            </div>

            {/* Payment Gateway Configurations */}
            <div className="settings-card">
              <h2>Payment Gateway Setup</h2>
              <form onSubmit={handleSaveGateway}>
                <div className="settings-form-group">
                  <label>Merchant ID</label>
                  <input
                    type="text"
                    value={gateway.merchantId}
                    onChange={e => setGateway({ ...gateway, merchantId: e.target.value })}
                  />
                </div>
                <div className="settings-form-group">
                  <label>API Public Key</label>
                  <input
                    type="text"
                    value={gateway.publicKey}
                    onChange={e => setGateway({ ...gateway, publicKey: e.target.value })}
                  />
                </div>
                <div className="settings-form-group">
                  <label>API Private Key</label>
                  <input
                    type="password"
                    value={gateway.privateKey}
                    onChange={e => setGateway({ ...gateway, privateKey: e.target.value })}
                  />
                </div>
                <button type="submit" className="save-btn">Save Configurations</button>
              </form>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
