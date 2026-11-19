
const cover = document.getElementById("cover");
const letterSection = document.getElementById("letterSection");
const ending = document.getElementById("ending");

const openBtn = document.getElementById("openBtn");
const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");

const chapterContent = document.getElementById("chapterContent");
const chapterLabel = document.getElementById("chapterLabel");
const pageNumber = document.getElementById("pageNumber");
const progressFill = document.getElementById("progressFill");
const navigationHint = document.getElementById("navigationHint");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const answer = document.getElementById("answer");
const bouquetReveal = document.getElementById("bouquetReveal");

let currentChapter = 0;

function animateSection(section) {
    section.classList.remove("section-enter");

    void section.offsetWidth;

    section.classList.add("section-enter");
}

const chapters = [
    {
        label: "A LITTLE SOMETHING · 01",
        title: "Hi, Akira ko.",
        paragraphs: [
            "Honestly, hindi ko talaga alam kung paano sisimulan 'to. I just wanted to make something for you, something na hindi lang basta message na mababasa mo tapos mawawala na rin.",
            "I know we both have our own things going on, and sometimes we get caught up with everything. Pero kahit gano'n, I still appreciate the little things about you. Even the simplest moments, the random conversations, and the times na magkasama lang tayo without having to do anything special.",
            "Maybe I don't always say it, but those things matter to me. And I hope you know that I don't take them for granted."
        ],
        handwritten: "Some little things stay with us."
    },
    {
        label: "A PAGE ABOUT US · 02",
        title: "We've had our moments, haven't we?",
        paragraphs: [
            "When I think about everything we've been through, I realize na hindi naman pala laging madali. We've had our fair share of misunderstandings, and there were times na hindi natin agad naintindihan kung saan nanggagaling 'yung isa't isa.",
            "May mga pagkakataong I wanted to be understood, pero I also had to realize na you wanted the same thing. Sometimes, we made assumptions instead of asking. Sometimes, we let our emotions speak before we could properly explain what we meant.",
            "And I know there were moments when you probably felt unheard, just as there were moments when I felt that way too. I don't want to dismiss any of that, because those feelings were real."
        ],
        handwritten: "We were both trying to be understood."
    },
    {
        label: "FROM THE HEART · 03",
        title: "I'm sorry, Akira.",
        paragraphs: [
            "I'm sorry for the times na may nasabi or nagawa ako na nakadagdag sa bigat ng nararamdaman mo. I'm sorry for the moments when I wasn't as considerate as I should've been, and for the times na mas nauna kong ipaliwanag 'yung sarili ko kaysa intindihin muna kung bakit ka nasaktan.",
            "I know there were situations involving trust, boundaries, and the way we treated each other's feelings. I understand that those things aren't something we can simply brush aside. And I know that saying sorry doesn't automatically make those moments disappear.",
            "I just want you to know that I acknowledge them. Hindi ko gustong balewalain 'yung mga pagkakataong nasaktan ka, or make it seem like they weren't important. You deserved to have your feelings heard, too.",
            "I'm sorry for my part in all of it. Sincerely."
        ],
        handwritten: "I mean every word of that apology."
    },
    {
        label: "ONE LAST PAGE · 04",
        title: "There's something else I want you to know.",
        paragraphs: [
            "And despite everything, I still want to say thank you. Thank you for letting me know parts of you that not everyone gets to see. Thank you for the moments when you made me laugh, for the little things you did, and for the memories we've made, even the ordinary ones.",
            "I know we're not perfect. We have different ways of expressing ourselves, different perspectives, and sometimes we don't get things right. But I hope you never think that the good things we've shared mean nothing to me just because we've had difficult moments.",
            "I appreciate you, Akira. Not just the happy moments, not just the easy parts, but also the fact that I've gotten to know you beyond those things.",
            "I don't really have a perfect ending for this letter. I just wanted to say these things while I had the chance, without expecting anything from you in return.",
            "I hope this little surprise makes you smile, even just a bit. You deserve a little something nice today. Take care of yourself for me, okay?"
        ],
        handwritten: "That's all I wanted to say."
    }
];

function renderChapter(index) {
    const chapter = chapters[index];

    chapterContent.dataset.chapter = index;

    chapterContent.innerHTML = `
        <h2>${chapter.title}</h2>
        ${chapter.paragraphs.map(paragraph => `<p>${paragraph}</p>`).join("")}
        <p class="handwritten-line">${chapter.handwritten}</p>
    `;

    chapterLabel.textContent = chapter.label;

    pageNumber.textContent =
        `${String(index + 1).padStart(2, "0")} / ${String(chapters.length).padStart(2, "0")}`;

    progressFill.style.width =
        `${((index + 1) / chapters.length) * 100}%`;

    backBtn.style.visibility = index === 0 ? "hidden" : "visible";

    if (index === chapters.length - 1) {
        nextBtn.innerHTML = 'One last thing';
        navigationHint.textContent = "just one more little thing...";
    } else {
        nextBtn.innerHTML = 'Continue <span>→</span>';
        navigationHint.textContent = "one page at a time";
    }

    chapterContent.classList.remove("chapter-change");
    void chapterContent.offsetWidth;
    chapterContent.classList.add("chapter-change");
}

openBtn.addEventListener("click", () => {
    cover.classList.add("hidden");
    letterSection.classList.remove("hidden");

    currentChapter = 0;
    renderChapter(currentChapter);
});


nextBtn.addEventListener("click", () => {
    if (currentChapter < chapters.length - 1) {
        currentChapter++;
        renderChapter(currentChapter);
    } else {
        letterSection.classList.add("page-exit");

        setTimeout(() => {
            letterSection.classList.add("hidden");
            letterSection.classList.remove("page-exit");

            ending.classList.remove("hidden");
            animateSection(ending);
        }, 450);
    }
});

backBtn.addEventListener("click", () => {
    if (currentChapter > 0) {
        currentChapter--;
        renderChapter(currentChapter);
    }
});

yesBtn.addEventListener("click", () => {
    answer.textContent = "Well, that's good to know. Miss na rin kita. 😘";
    bouquetReveal.classList.remove("hidden");
    createHearts(12);
});

noBtn.addEventListener("click", () => {
    answer.textContent = "Okay, I'll pretend I didn't see that. HAHAHAHAHAHAHAHAHAHAHAHAHAHA. 😭";
    bouquetReveal.classList.remove("hidden");
    noBtn.textContent = "Fine, I miss you too. 🙄";
    createHearts(7);
});

function createHearts(amount) {
    const symbols = ["♡", "♥", "✿"];

    for (let i = 0; i < amount; i++) {
        const decoration = document.createElement("span");

        decoration.className = "floating-heart";
        decoration.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        decoration.style.left = `${Math.random() * 100}%`;
        decoration.style.fontSize = `${12 + Math.random() * 17}px`;
        decoration.style.animationDuration = `${3 + Math.random() * 3}s`;

        document.body.appendChild(decoration);

        setTimeout(() => {
            decoration.remove();
        }, 6500);
    }
}
