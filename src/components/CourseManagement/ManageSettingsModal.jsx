import React, { useState, useEffect } from "react";
import {
  Plus,
  X,
  ChevronDown,
  ChevronRight,
  Image,
  Trash2,
} from "lucide-react";

export default function ManageSettingsModal({ isOpen, onClose }) {
  const [categories, setCategories] = useState([]);
  const [expandedNodes, setExpandedNodes] = useState(new Set());

  // Create new node with structure
  const createNewNode = (type = "Age Group", depth = 0) => ({
    id: Date.now() + Math.random(),
    name: "",
    type,
    description: "",
    image: null,
    imagePreview: null,
    ageRangeStart: "",
    ageRangeEnd: "",
    levelName: "",
    levelValue: "",
    children: [],
    depth,
  });

  // Initialize first category automatically on mount
  useEffect(() => {
    if (categories.length === 0) {
      const root = createNewNode("Age Group", 0);
      setCategories([root]);
      setExpandedNodes(new Set([root.id]));
    }
  }, []);

  // Update node recursively
  const updateNode = (list, id, field, value) => {
    return list.map((node) =>
      node.id === id
        ? { ...node, [field]: value }
        : { ...node, children: updateNode(node.children, id, field, value) }
    );
  };

  // Add child node
  const addChildNode = (list, parentId, type) => {
    return list.map((node) => {
      if (node.id === parentId) {
        const newChild = createNewNode(type, node.depth + 1);
        return { ...node, children: [...node.children, newChild] };
      }
      return { ...node, children: addChildNode(node.children, parentId, type) };
    });
  };

  // Delete node
  const deleteNode = (list, id) => {
    return list
      .filter((node) => node.id !== id)
      .map((node) => ({ ...node, children: deleteNode(node.children, id) }));
  };

  // Toggle expand
  const toggleExpand = (id) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  // Handle image upload
  const handleImageUpload = (id, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCategories((prev) =>
          updateNode(prev, id, "imagePreview", reader.result)
        );
      };
      reader.readAsDataURL(file);
      setCategories((prev) => updateNode(prev, id, "image", file));
    }
  };

  // Handle change
  const handleChange = (id, field, value) => {
    setCategories((prev) => updateNode(prev, id, field, value));
  };

  // Handle add child
  const handleAddChild = (parentId, type) => {
    setCategories((prev) => addChildNode(prev, parentId, type));
    setExpandedNodes((prev) => new Set([...prev, parentId]));
  };

  // Handle delete
  const handleDelete = (id) => {
    setCategories((prev) => deleteNode(prev, id));
  };

  // Recursive node rendering
  const renderNode = (node) => {
    const isExpanded = expandedNodes.has(node.id);
    const hasChildren = node.children.length > 0;
    const depth = node.depth || 0;

    const colorSchemes = [
      {
        bg: "bg-orange-50",
        border: "border-orange-200",
        text: "text-orange-600",
      },
      { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-600" },
      { bg: "bg-green-50", border: "border-green-200", text: "text-green-600" },
      {
        bg: "bg-purple-50",
        border: "border-purple-200",
        text: "text-purple-600",
      },
    ];
    const scheme = colorSchemes[depth % colorSchemes.length];

    return (
      <div key={node.id} className="mb-4">
        <div
          className={`${scheme.bg} ${scheme.border} border-2 rounded-lg p-4 shadow-sm transition-all hover:shadow-md`}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {hasChildren && (
                <button
                  type="button"
                  onClick={() => toggleExpand(node.id)}
                  className={`${scheme.text} hover:bg-white rounded p-1 transition-colors`}
                >
                  {isExpanded ? (
                    <ChevronDown size={20} />
                  ) : (
                    <ChevronRight size={20} />
                  )}
                </button>
              )}
              <h3 className={`${scheme.text} font-semibold text-lg`}>
                {depth === 0 ? "📁 Category" : `📊 Level ${depth}`}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={node.type}
                onChange={(e) => handleChange(node.id, "type", e.target.value)}
                className={`border-2 ${scheme.border} rounded-md px-3 py-1.5 text-sm font-medium ${scheme.text} bg-white focus:outline-none focus:ring-2 focus:ring-orange-400`}
              >
                <option value="Age Group">Age Group</option>
                <option value="Other">Other</option>
              </select>
              {depth > 0 && (
                <button
                  type="button"
                  onClick={() => handleDelete(node.id)}
                  className="text-red-500 hover:bg-red-50 rounded p-1.5 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          </div>

          {/* Inputs */}
          <div className="space-y-3">
            {/* GROUP NAME — only for Age Group */}
            {node.type === "Age Group" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Group Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Kids Programming"
                  value={node.name}
                  onChange={(e) =>
                    handleChange(node.id, "name", e.target.value)
                  }
                  className="w-full border-2 border-gray-300 rounded-md px-3 py-2 text-sm focus:border-orange-400 focus:outline-none"
                />
              </div>
            )}

            {/* AGE GROUP TYPE FIELDS */}
            {node.type === "Age Group" && (
              <>
                {/* Age Range (Start & End) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Age Range ( Start & End )
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      placeholder="Start (e.g., 5)"
                      value={node.ageRangeStart}
                      onChange={(e) =>
                        handleChange(node.id, "ageRangeStart", e.target.value)
                      }
                      className="w-full border-2 border-gray-300 rounded-md px-3 py-2 text-sm focus:border-orange-400 focus:outline-none"
                    />
                    <input
                      type="number"
                      placeholder="End (e.g., 10)"
                      value={node.ageRangeEnd}
                      onChange={(e) =>
                        handleChange(node.id, "ageRangeEnd", e.target.value)
                      }
                      className="w-full border-2 border-gray-300 rounded-md px-3 py-2 text-sm focus:border-orange-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Image or Icon (Optional) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image or Icon ( Optional )
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                      <Image size={18} className="text-gray-600" />
                      <span className="text-sm text-gray-600">
                        Choose Image
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleImageUpload(
                            node.id,
                            e.target.files?.[0] || null
                          )
                        }
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Description (Optional) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description ( Optional )
                  </label>
                  <textarea
                    placeholder="e.g., For kids aged 5–10 years"
                    value={node.description}
                    onChange={(e) =>
                      handleChange(node.id, "description", e.target.value)
                    }
                    rows={2}
                    className="w-full border-2 border-gray-300 rounded-md px-3 py-2 text-sm focus:border-orange-400 focus:outline-none resize-none"
                  />
                </div>
              </>
            )}

            {/* OTHER TYPE FIELDS */}
            {node.type === "Other" && (
              <>
                {/* Level Name and Level Value in same row */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Level Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Technology"
                      value={node.levelName}
                      onChange={(e) =>
                        handleChange(node.id, "levelName", e.target.value)
                      }
                      className="w-full border-2 border-gray-300 rounded-md px-3 py-2 text-sm focus:border-orange-400 focus:outline-none"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Level Value
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., C"
                      value={node.levelValue}
                      onChange={(e) =>
                        handleChange(node.id, "levelValue", e.target.value)
                      }
                      className="w-full border-2 border-gray-300 rounded-md px-3 py-2 text-sm focus:border-orange-400 focus:outline-none"
                    />

                    {/* ✅ Add More Value Button Below */}
                    <button
                      type="button"
                      onClick={() => handleAddChild(node.id, "Other")}
                      className="mt-2 flex items-center gap-1 text-sm font-semibold text-orange-600 bg-orange-100 px-3 py-1.5 rounded-md hover:bg-orange-200 transition-colors"
                    >
                      <Plus size={14} /> Add more Value
                    </button>
                  </div>
                </div>

                {/* Level Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Level Description ( Optional )
                  </label>
                  <textarea
                    placeholder="e.g., Description of this level"
                    value={node.description}
                    onChange={(e) =>
                      handleChange(node.id, "description", e.target.value)
                    }
                    rows={2}
                    className="w-full border-2 border-gray-300 rounded-md px-3 py-2 text-sm focus:border-orange-400 focus:outline-none resize-none"
                  />
                </div>

                {/* Level Upload Icon */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Level Upload Icon ( Optional )
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                      <Image size={18} className="text-gray-600" />
                      <span className="text-sm text-gray-600">
                        Choose Image
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleImageUpload(
                            node.id,
                            e.target.files?.[0] || null
                          )
                        }
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </>
            )}

            {/* Add More Level Button */}
            <div className="flex justify-start pt-2 border-t border-gray-200">
              <button
                type="button"
                onClick={() => handleAddChild(node.id, node.type)}
                className="flex items-center gap-1 px-4 py-2 text-orange-600 bg-orange-100 border-2 border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                <Plus size={16} />
                Add more level
              </button>
            </div>
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div className="ml-8 mt-3 border-l-4 border-gray-200 pl-4">
            {node.children.map((child) => renderNode(child))}
          </div>
        )}
      </div>
    );
  };

  // if modal is not open, return null
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-auto p-4">
      <div className="bg-white w-full max-w-6xl rounded-2xl shadow-2xl my-8 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b-2 border-gray-200 bg-gradient-to-r from-orange-500 to-orange-600">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            ⚙️ Manage Course Settings
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {categories.map((cat) => renderNode(cat))}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t-2 border-gray-200 bg-gray-50">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              console.log("Saved categories:", categories);
              alert("Settings saved successfully!");
              onClose();
            }}
            className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-md hover:shadow-lg font-medium"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
