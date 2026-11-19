// Gives every shell example two tabs, one per version of SafetyBox.
//
// The pages write each command with `safetybox`. The two versions take
// the same verbs and flags, so the other tab is the same example with
// the command name swapped. The choice applies to every example and is
// remembered.
//
// Only the command word changes. A path such as ~/.config/safetybox/,
// a variable such as SAFETYBOX_VAULT, and a URL all stay as written,
// because both versions use them unchanged.
(function () {
    "use strict";

    var VERSIONS = [
        { name: "safetybox", label: "safetybox (Go)" },
        { name: "sanctuary", label: "sanctuary (Rust)" }
    ];
    var STORAGE_KEY = "safetybox-docs-command";

    // The command word: not part of a path, a URL, or a longer name.
    var COMMAND = /(?<![\w\/.\-~$])safetybox(?![\w\/.\-])/g;

    function remembered() {
        try {
            var stored = window.localStorage.getItem(STORAGE_KEY);

            if (stored === "sanctuary" || stored === "safetybox") {
                return stored;
            }
        } catch (error) {
            // Storage can be blocked. The default still works.
        }

        return "safetybox";
    }

    function remember(name) {
        try {
            window.localStorage.setItem(STORAGE_KEY, name);
        } catch (error) {
            // Nothing to do: the choice lasts for this page only.
        }
    }

    function textNodes(root) {
        var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        var nodes = [];

        while (walker.nextNode()) {
            nodes.push(walker.currentNode);
        }

        return nodes;
    }

    // Finds each command word in a code block. A match is recorded by
    // the text node that holds it, so the highlighting stays in place.
    function commandSites(code) {
        var nodes = textNodes(code);
        var whole = "";
        var starts = [];

        nodes.forEach(function (node) {
            starts.push(whole.length);
            whole += node.data;
        });

        var sites = [];
        var match;

        COMMAND.lastIndex = 0;

        while ((match = COMMAND.exec(whole)) !== null) {
            for (var index = nodes.length - 1; index >= 0; index -= 1) {
                if (starts[index] <= match.index) {
                    var offset = match.index - starts[index];

                    // A word split across two nodes is left alone.
                    if (offset + match[0].length <= nodes[index].data.length) {
                        sites.push({ node: nodes[index], offset: offset });
                    }

                    break;
                }
            }
        }

        return sites;
    }

    var blocks = [];

    function show(name) {
        blocks.forEach(function (block) {
            // Rebuild each node from its original text, last match
            // first, so earlier offsets stay valid.
            block.originals.forEach(function (original) {
                original.node.data = original.text;
            });

            if (name !== "safetybox") {
                block.sites.slice().reverse().forEach(function (site) {
                    var text = site.node.data;

                    site.node.data =
                        text.slice(0, site.offset) +
                        name +
                        text.slice(site.offset + "safetybox".length);
                });
            }

            block.buttons.forEach(function (button) {
                var chosen = button.dataset.command === name;

                button.classList.toggle("chosen", chosen);
                button.setAttribute("aria-selected", chosen ? "true" : "false");
            });
        });
    }

    function tabs() {
        var bar = document.createElement("div");

        bar.className = "command-tabs";
        bar.setAttribute("role", "tablist");
        bar.setAttribute("aria-label", "Version of SafetyBox");

        var buttons = VERSIONS.map(function (version) {
            var button = document.createElement("button");

            button.type = "button";
            button.className = "command-tab";
            button.textContent = version.label;
            button.dataset.command = version.name;
            button.setAttribute("role", "tab");

            button.addEventListener("click", function () {
                // Keep the clicked tab where it is on screen while
                // every other example changes above it.
                var before = button.getBoundingClientRect().top;

                remember(version.name);
                show(version.name);

                window.scrollBy(0, button.getBoundingClientRect().top - before);
            });

            bar.appendChild(button);

            return button;
        });

        return { bar: bar, buttons: buttons };
    }

    function setUp() {
        var codes = document.querySelectorAll(
            "main pre > code.language-sh, main pre > code.language-fish"
        );

        codes.forEach(function (code) {
            if (code.classList.contains("one-version")) {
                return;
            }

            var sites = commandSites(code);

            if (sites.length === 0) {
                return;
            }

            var seen = [];
            var originals = [];

            sites.forEach(function (site) {
                if (seen.indexOf(site.node) === -1) {
                    seen.push(site.node);
                    originals.push({ node: site.node, text: site.node.data });
                }
            });

            var made = tabs();
            var pre = code.parentNode;

            pre.parentNode.insertBefore(made.bar, pre);
            pre.classList.add("has-command-tabs");

            blocks.push({ sites: sites, originals: originals, buttons: made.buttons });
        });

        show(remembered());
    }

    if (document.readyState === "complete") {
        setUp();
    } else {
        window.addEventListener("load", setUp);
    }
})();
