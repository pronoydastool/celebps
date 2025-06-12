# backend/data.py
APP_DATA = {
    "physics": {
        "articles": [
            {
                "id": "newton-first-law",
                "title": "Newton First Law",
                "content": """
                    <p>Sir Isaac Newton, one of the most influential scientists in history, formulated three laws of motion that laid the foundation for classical mechanics. Among these, Newton's First Law of Motion is a fundamental concept that explains how objects behave when no forces are acting on them or when forces are balanced. This law is often referred to as the Law of Inertia.</p>
                    <h3>What is Newton's First Law?</h3>
                    <p>Newton's First Law states:</p>
                    <blockquote>"An object at rest will remain at rest, and an object in motion will continue in motion with the same speed and in the same direction unless acted upon by an unbalanced external force."</blockquote>
                    <p>In simpler terms, this means that things don't start moving, stop moving, or change direction all by themselves. It takes a force to make those changes happen.</p>
                    <h3>The Concept of Inertia</h3>
                    <p>The key idea behind Newton's First Law is inertia. Inertia is the natural tendency of an object to resist changes in its state of motion. If something is not moving, it won't start moving unless something pushes or pulls it. Similarly, if something is moving, it will keep moving in the same way unless something slows it down, speeds it up, or changes its direction.</p>
                    <p>For example, imagine a ball resting on the ground. It will stay there unless you kick it. That kick provides an unbalanced force. If you roll the ball on a smooth surface, it will continue rolling, but eventually, it stops due to friction — an external force acting against its motion.</p>
                    <div class="formula-box">F = G <sup>Mm</sup>⁄<sub>d²</sub></div>
                """
            },
            {
                "id": "ohm-law",
                "title": "Ohm's Law",
                "content": "<p>Ohm's law states that the current through a conductor between two points is directly proportional to the voltage across the two points. Introducing the constant of proportionality, the resistance, one arrives at the usual mathematical equation that describes this relationship: I = V/R.</p><div class='formula-box'>V = IR</div>"
            }
        ],
        "experiments": [
            { "id": "pendulum", "title": "Simple Pendulum", "content": "<p>Experiment details for a simple pendulum...</p>" }
        ],
        "provements": [],
        "tools": [
             { "id": "calculator", "title": "Calculator" },
             { "id": "rules-calculator", "title": "Rules Calculator" }
        ]
    },
    "chemistry": {
        "articles": [
            { "id": "chem-bonding", "title": "Chemical Bonding", "content": "<p>Content for Chemical Bonding goes here...</p>" }
        ],
        "experiments": [],
        "provements": [],
        "tools": []
    },
    "biology": { "articles": [], "experiments": [], "provements": [], "tools": [] },
    "astronomy": { "articles": [], "experiments": [], "provements": [], "tools": [] }
}
